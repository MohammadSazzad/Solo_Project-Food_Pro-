import { createTempAdmin, getAdminByEmail , deleteTempAdmin, getTempAdminByEmail, createAdmin, createAdminImage, removeAdminImage } from '../model/admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createToken } from '../auth/createJWt.js';
import { sendVerificationEmailForAdmin } from '../auth/adminVerification.js';
import uploadOnCloudinary from '../utility/cloudinary.js';

export const createTempAdminController = async(req, res) => {
    const { adminName, email, password } = req.body;
    if( !adminName || !email || !password ){
        return res.status(400).json({message: 'All fields are required'});
    }
    const user = await getAdminByEmail(email);
    if(user){
        return res.status(400).json({message: 'Email already exists'});
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        await createTempAdmin(adminName, email, hashedPassword);
        const payload = { email };
        const token = createToken(payload, '1d');
        await sendVerificationEmailForAdmin(email, token);
        return res.status(201).json({message: 'Verification email has been sent to your email'});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const verifyAdminController = async(req, res) => {
    const { token } = req.params;
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        const { email } = decoded;
        const user = await getTempAdminByEmail(email);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        await createAdmin(user.adminName, user.email, user.password);
        await deleteTempAdmin(email);
        return res.status(200).json({message: 'Account has been verified'});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const adminLoginController = async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message: 'All fields are required'});
    }
    const user = await getAdminByEmail(email);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
        return res.status(400).json({message: 'Invalid credentials'});
    }
    try{
        const payload = {
            id: user.adminID,
            adminName: user.adminName,
            email: user.email,
            role: user.role
        };
        const token = createToken(payload, '1d');
        return res.status(200).json({token});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const createAdminImageController = async(req, res) => {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    if(decoded.role !== 'admin'){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const LocalFilePath = req.file.path;
        const cloudinaryImage = await uploadOnCloudinary(LocalFilePath);
        const cloudinaryImageUrl = cloudinaryImage.url;
        const { id } = decoded;
        await createAdminImage(id, cloudinaryImageUrl);
        return res.status(200).json({message: 'Admin Image Created'});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const removeAdminImageController = async(req, res) => {
    if(req.user.role !== 'admin'){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const { id } = req.user;
        await removeAdminImage(id);
        return res.status(200).json({message: 'Admin Image Removed'});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}
