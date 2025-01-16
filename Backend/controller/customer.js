import { createToken } from "../auth/createJWt.js";
import { createTempCustomer, getCustomer, getTempCustByEmail, deleteTempCustomer, getCustomerByEmail, customerImage, removecustomerImage, createCustomer, getCustomerByID, updateCustomer} from "../model/customer.js";
import uploadOnCloudinary from "../utility/cloudinary.js";
import { sendVerificationEmailForCustomer } from "../auth/customerVerification.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createCustomerController = async (req, res) => {
    const { FirstName, LastName, Email, PhoneNumber, Address, City, DateOfBirth, password } = req.body;
    if(!FirstName || !LastName || !Email || !PhoneNumber || !Address || !City || !DateOfBirth || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const user = await getCustomer();
    const foundByEmail = user.find((user) => user.Email === Email);
    const foundByPhoneNumber = user.find((user) => user.PhoneNumber === PhoneNumber);
    if( foundByEmail || foundByPhoneNumber) {
        return res.status(400).json({ error: "Email or Phone Number already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await createTempCustomer(FirstName, LastName, Email, PhoneNumber, Address, City, DateOfBirth, hashedPassword);
        const token = createToken({Email}, "1d");
        await sendVerificationEmailForCustomer(Email, token);
        res.status(201).json({ message: "Verification email has been sent to your email" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  

export const verifyCustomerController = async (req, res) => {
    const { token } = req.params;
    console.log("Token", token);
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        const { Email } = decoded;
        const user = await getTempCustByEmail(Email);
        console.log("User", user);
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await createCustomer(user.FirstName, user.LastName, user.Email, user.PhoneNumber, user.Address, user.City, user.DateOfBirth, user.password);
        await deleteTempCustomer(Email);
        res.status(200).json({ message: "Account has been verified"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const customerLoginController = async (req, res) => {
    const { Email, password}= req.body;
    if(!Email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const user = await getCustomerByEmail(Email);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
    }
    try{
        const payload = {
            id: user.CustomerID, 
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email,
            PhoneNumber: user.PhoneNumber,
            Address: user.Address,
            City: user.City,
            DateOfBirth: user.DateOfBirth,
            role: user.role,
            image: user.image
        };
        const token = createToken(payload, "1d");
        res.status(200).json({ token });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

export const getCustomerController = async (req, res) => {
    console.log("Decoded req.user in getCustomerController:", req.user);
    if(req.user.role!== "customer") {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const user = await getCustomer();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const customerImageController = async (req, res) => {
    const Token = req.params.token;
    const decoded = jwt.verify(Token, process.env.ACCESS_TOKEN);
    console.log("Decoded", decoded);
    const {role} = decoded;
    if(role !== "customer"){
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const { id } = decoded;
        const LocalFilePath = req.file.path;
        const cloudinaryImage = await uploadOnCloudinary(LocalFilePath);
        const imageUrl = cloudinaryImage.url;
        console.log("Image URL", imageUrl);
        await customerImage(id, imageUrl);
        res.status(200).json({ message: "Image uploaded successfully" });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

export const removeCustomerImageController = async (req, res) => {
    const Token = req.params.token;
    const decodedToken = jwt.verify(Token, process.env.ACCESS_TOKEN);
    const { role }= decodedToken;
    if(role !== "customer"){
        return res.status(401).json({ message: "Unauthorized" });
    }
    try{
        const { id } = decodedToken;
        const user = await getCustomer();
        const found = user.find((user) => user.CustomerID === id);
        if(!found){
            return res.status(404).json({ message: "User not found" });
        }
        await removecustomerImage(id);
        res.status(200).json({ message: "Image removed successfully" });
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
};

export const updateCustomerDetailsController = async (req, res) => {
    const CustomerID = req.params.customerID;
    const { firstName, lastName, address, city, dateOfBirth } = req.body;
    const user = await getCustomerByID(CustomerID);
    const updateFirstName = firstName || user.FirstName ;
    const updateLastName = lastName || user.LastName ;
    const updateAddress = address || user.Address ;
    const updateCity = city || user.City ;
    const updateDateOfBirth = dateOfBirth || user.DateOfBirth ;
    if(user.role !== "customer"){
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        await updateCustomer(updateFirstName, updateLastName, updateAddress, updateCity, updateDateOfBirth, CustomerID);
        res.status(200).json({ message: "User details updated successfully" });
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
};