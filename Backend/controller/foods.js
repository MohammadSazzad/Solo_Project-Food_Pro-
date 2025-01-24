import { createFoodImage, createFoodDetails, getFoodDetailsByFoodID, getAllFoods, getFoodByCategory, getFoodByRestuarantID, deleteFoodByFoodID, deleteFoodByRestuarantID, orderHistory } from '../model/foods.js';
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
        return res.status(200).json({message: 'Image Uploaded', id: foodID});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const createFoodDetailsController = async(req, res) => {
    const FoodID = req.params.foodID;
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

export const orderHistoryControler = async(req, res) => {
    const customerID1 = req.params.CustomerID;
    const customerID2 = req.user.id;

    if (req.user.role === 'customer' && String(customerID1) === String(customerID2)){
        try{
            const result = await orderHistory(customerID1);
            return res.status(200).json(result);
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    } else if(req.user.role === 'admin'){
        try{
            const result = await orderHistory(customerID1);
            return res.status(200).json(result);
        }catch(error){
            return res.status(500).json({message: error.message});
        }

    } else{
        return res.status(401).json({message: 'Unauthorized'});
    }
};