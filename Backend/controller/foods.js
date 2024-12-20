import { createFoodImage, createFoodDetails, getFoodDetailsByFoodID, getAllFoods, getFoodByCategory, getFoodByRestuarantID, deleteFoodByFoodID, deleteFoodByRestuarantID } from '../model/foods.js';
import uploadOnCloudinary from '../utility/cloudinary.js';
import { createToken } from '../auth/createJWt.js';

import jwt from 'jsonwebtoken';

export const createFoodImageController = async(req, res) => {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    if(decoded.role !== 'seller'){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try {
        const LocalFilePath = req.file.path;
        const cloudinaryImage = await uploadOnCloudinary(LocalFilePath);
        const cloudinaryImageUrl = cloudinaryImage.url;
        const { id } = decoded;
        const foodID = await createFoodImage(id, cloudinaryImageUrl);
        console.log(foodID);
        const payload = {
            id: foodID,
            restuarantID: decoded.id,
            role : decoded.role
        };
        const foodtoken = createToken(payload, '1d');
        return res.status(200).json({foodtoken});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const createFoodDetailsController = async(req, res) => {
    const FoodID = req.user.id;
    console.log(FoodID);
    const result = await getFoodDetailsByFoodID(FoodID);
    console.log(result);
    const RestuarantID = req.user.restuarantID;
    console.log(RestuarantID);
    const role = req.user.role;
    if(role !== 'seller' || RestuarantID !== result.RestuarantID){
        return res.status(401).json({message: 'Unauthorized'});
    }
    const { categoryID, foodName, price, stock } = req.body;
    try{
        await createFoodDetails(FoodID, categoryID, foodName, price, stock);
        return res.status(200).json({message: 'Food Details Created'});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getFoodsByFoodIDController = async(req, res) => {
    const FoodID = req.params.foodID;
    if(req.user.role === 'seller' || req.user.role === 'admin'){
        try{
            const result = await getFoodDetailsByFoodID(FoodID);
            return res.status(200).json(result);
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }else{
        return res.status(401).json({message: 'Unauthorized'});
    }
}

export const getAllFoodsController = async(req, res) => {
    if(req.user.role !== 'admin'){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const result = await getAllFoods();
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getFoodsByCategoryController = async(req, res) => {
    const categoryID = req.params.categoryID;
    if(req.user.role !== 'admin'){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const result = await getFoodByCategory(categoryID);
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getFoodsByRestuarantIDController = async(req, res) => {
    if(req.user.role === 'seller'){
        try{
            const RestuarantID = req.user.id;
            const result = await getFoodByRestuarantID(RestuarantID);
            return res.status(200).json(result);
        }catch(error){
            return res.status(500).json({message: error.message});
        }

    }else {
        return res.status(401).json({message: 'Unauthorized'});
    }
    
}

export const getFoodsByRestuarantID_AdminController = async(req, res) => {
    const RestuarantID = req.params.RestuarantID;
    if(req.user.role !== 'admin'){
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const result = await getFoodByRestuarantID(RestuarantID);
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const deleteFoodByFoodIDController = async(req, res) => {
    const FoodID = req.params.foodID;
    if(req.user.role === 'seller'){
        try{
            const RestuarantID = req.user.id;
            const result = await getFoodByRestuarantID(RestuarantID);
            const food = result.find((result) => result.foodID === parseInt(FoodID));
            if(!food){
                return res.status(401).json({message: 'Food items not found for this seller'});
            }
            await deleteFoodByFoodID(FoodID);
            return res.status(200).json({message: 'Food Deleted'});
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }else if(req.user.role === 'admin'){
        try{
            await deleteFoodByFoodID(FoodID);
            return res.status(200).json({message: 'Food Deleted'});
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }else{
        return res.status(401).json({message: 'Unauthorized'});
    }
}

export const deleteFoodByRestuarantIDController = async(req, res) => {
    if(req.user.role !== 'seller'){
        return res.status(401).json({message: 'Unauthorized'});
    }

    try{
        const RestuarantID = req.user.id;
        await deleteFoodByRestuarantID(RestuarantID);
        return res.status(200).json({message: 'All Foods Deleted'});
    }catch(error){
        return res.status(500).json({message: error.message});
    }   
}