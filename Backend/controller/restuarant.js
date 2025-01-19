import { createTempRestuarant, getRestaurants, getRestuarantByEmail, getTempRestuarantByEmail, deleteTempRestuarant, createRestuarant, createRestuarantImage, removeRestuarantImage, updateRestuarantDetails, getRestuarantByID } from "../model/restuarant.js";
import bcrypt from "bcrypt";
import { createToken } from "../auth/createJWt.js";
import { sendVerificationEmailForRestuarant } from "../auth/restuarantVerification.js";
import jwt from "jsonwebtoken";
import uploadOnCloudinary from "../utility/cloudinary.js";

export const createTempRestuarantController = async (req, res) => {
    const { Restuarant_Name, Owner_Name, Email, PhoneNumber, Address, City, password } = req.body;
    if( !Restuarant_Name || !Owner_Name || !Email || !PhoneNumber || !Address || !City || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const found = await getRestaurants();
    const foundByName = found.find((found) => found.Restuarant_Name === Restuarant_Name);
    const foundByEmail = found.find((found) => found.Email === Email);
    if(foundByName || foundByEmail) {
        return res.status(400).json({ error: "Restuarant already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await createTempRestuarant(Restuarant_Name, Owner_Name, Email, PhoneNumber, Address, City, hashedPassword);
        const token = createToken({Email}, "1d");
        await sendVerificationEmailForRestuarant(Email, token);
        res.status(201).json({ message: "Verification email has been sent to your email" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const verifyRestuarantController = async (req, res) => {
    const { token } = req.params;
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        const { Email } = decoded;
        const user = await getTempRestuarantByEmail(Email);
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }
        await createRestuarant(user.Restuarant_Name, user.Owner_Name, user.Email, user.PhoneNumber, user.Address, user.City, user.password);
        await deleteTempRestuarant(Email);
        res.status(200).json({ message: "Account has been verified" });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

export const restuarantLoginController = async (req, res) => {
    const { Email, password } = req.body;
    if(!Email || !password){
        return res.status(400).json({ error: "All fields are required" });
    }
    const user = await getRestuarantByEmail(Email);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
        return res.status(400).json({ error: "Invalid credentials" });
    }
    try{
        const id = user.RestuarantID;
        const payload = {
            id,
            Restuarant_Name: user.Restuarant_Name,
            Owner_Name: user.Owner_Name,
            Email: user.Email,
            PhoneNumber: user.PhoneNumber,
            Address: user.Address,
            City: user.City,
            role: user.role,
            image: user.image,
        };
        const token = createToken(payload, "1d");
        res.status(200).json({ token });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

export const getAllRestuarantsController = async (req, res) => {
    if(req.user.role !== "admin"){
        return res.status(401).json({ error: "Unauthorized" });
    }
    try{
        const restuarants = await getRestaurants();
        res.status(200).json(restuarants);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

export const restuarantOwnerImageController = async (req, res) => {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    const { role } = decoded;
    if(role !== "seller"){
        return res.status(401).json({ error: "Unauthorized" });
    }
    try{
        const LocalFilePath = req.file.path;
        const {id} = decoded;
        const cloudinaryImage = await uploadOnCloudinary(LocalFilePath);
        const imageURL = cloudinaryImage.url;
        await createRestuarantImage(id, imageURL);
        res.status(200).json({ imageURL });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

export const removeRestuarantOwnerImageController = async (req, res) => {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    if(decoded.role !== "seller"){
        return res.status(401).json({ error: "Unauthorized" });
    }
    try{
        const user = await getRestaurants();
        const found = user.find((user) => user.RestuarantID === decoded.id);
        if(!found){
            return res.status(404).json({ error: "User not found" });
        }
        await removeRestuarantImage(decoded.id);
        res.status(200).json({ message: "Image removed successfully" });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

export const updateRestuarantDetailsController = async (req, res) => {
    const { restuarant_Name, owner_Name, phoneNumber, address, city } = req.body;
    const RestuarantID = req.params.ResID;
    const user = await getRestuarantByID(RestuarantID);
    if(!user){
        return res.status(404).json({ error: "User not found" });
    }
    const updatedRestuarant_Name = restuarant_Name || user.Restuarant_Name;
    const updatedOwner_Name = owner_Name || user.Owner_Name;
    const updatedPhoneNumber = phoneNumber || user.PhoneNumber;
    const updatedAddress = address || user.Address;
    const updatedCity = city || user.City;
    try{
        await updateRestuarantDetails(RestuarantID, updatedRestuarant_Name, updatedOwner_Name, updatedPhoneNumber, updatedAddress, updatedCity);
        res.status(200).json({ message: "Details updated successfully" });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};