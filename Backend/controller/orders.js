import { createOrder, updateOrder, deleteOrder, getAllOrders, getOrderByID } from "../model/orders.js";

export const createOrderController = async (req, res) => {
    if(req.user.role !== 'customer') {
        return res.status(401).json({message: 'Please login as customer first to place an order'});
    }
    try{
        const customerID = req.user.id;
        const { OrderDate, TotalAmount, status, CreatedAt, UpdatedAt } = req.body;
        const result = await createOrder(OrderDate, TotalAmount, status, customerID, CreatedAt, UpdatedAt);
        return res.status(201).json(result);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const deleteOrderController = async (req, res) => {
    if(req.user.role === 'customer' || req.user.role === 'admin') {
        try{
            const { orderID } = req.params;
            await deleteOrder(orderID);
            return res.status(200).json({message: 'Order deleted successfully'});
        }catch(error){
            return res.status(500).json({message: error.message});
        }
    }else{
        return res.status(401).json({message: 'Unauthorized'});
    }
}

export const updateOrderController = async (req, res) => {
    if(req.user.role !== 'admin') {
        return res.status(401).json({message: 'Sorry, you can not update this order'});
    }
    try{
        const { status } = req.body;
        const { orderID } = req.params;
        const result = await updateOrder(orderID, status);
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getAllOrdersController = async (req, res) => {
    if(req.user.role !== 'admin') {
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const result = await getAllOrders();
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getOrderByIDController = async (req, res) => {
    if(req.user.role !== 'admin') {
        return res.status(401).json({message: 'Unauthorized'});
    }
    try{
        const { orderID } = req.params;
        const result = await getOrderByID(orderID);
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}