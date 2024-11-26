import { createOrderItem, getAllOrderItems, getOrderItemByID, getOrderItemByRestaurantID, getOrderItemByFoodID } from "../model/ordersItem.js";

export const createOrderItemController = async (req, res) => {
    if(req.user.role !== 'customer') {
        return res.status(401).json({message: 'Please loginn as customer first to place an order'});
    }
    try{
        const { orderID, RestuarantID, foodID, price, quantity } = req.body;
        const result = await createOrderItem(orderID, RestuarantID, foodID, price, quantity);
        return res.status(201).json(result);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getAllOrderItemsController = async (req, res) => {
    if(req.user.role !== 'admin') {
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const result = await getAllOrderItems();
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getOrderItemByIDController = async (req, res) => {
    if(req.user.role !== 'admin') {
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const { orderID } = req.params;
        const result = await getOrderItemByID(orderID);
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getOrderItemByRestaurantIDController = async (req, res) => {
    if(req.user.role === 'admin' || req.user.role === 'seller') {
        try{
            const { restuarantID } = req.params;
            const result = await getOrderItemByRestaurantID(restuarantID);
            return res.status(200).json(result);
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }else{
        return res.status(401).json({message: 'Unauthorized'});
    }
}

export const getOrderItemByFoodIDController = async (req, res) => {
    if(req.user.role !== 'admin') {
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const { foodID } = req.params;
        const result = await getOrderItemByFoodID(foodID);
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
        
}
