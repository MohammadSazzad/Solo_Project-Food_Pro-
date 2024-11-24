import { createFoodImage, createFoodDetails, getFoodDetailsByFoodID} from '../model/foods.js';
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