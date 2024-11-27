import { getFoodName, createCart, removeFoodFromCart, getAllCart, getCartByCustomerID, getCartByrestaurant } from "../model/cart.js";

export const createCartController = async (req, res) => {
    if(req.user.role !== 'customer') {
        return res.status(403).json({ message: 'Please login as customer to place a food to cart.' });
    }
    try{
        const CustomerID = req.user.id;
        const { foodID, RestuarantID } = req.body;
        const foodName = await getFoodName(foodID);
        const result = await createCart(CustomerID, foodID, RestuarantID, foodName);
        return res.status(201).json(result);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const removeFoodFromCartController = async (req, res) => {
    if(req.user.role !== 'customer') {
        return res.status(403).json({ message: 'Please login as customer to remove a food from cart.' });
    }
    try{
        const { cartID } = req.body;
        const result = await removeFoodFromCart(cartID);
        return res.status(200).json(result);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const getAllCartController = async (req, res) => {
    if(req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Please login as admin to view all carts.' });
    }
    try{
        const result = await getAllCart();
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export const getCartByCustomerID_adminController = async (req, res) => {
    if(req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Please login as admin to view all carts by customer.' });
    }
    try{
        const { customerID } = req.params;
        const result = await getCartByCustomerID(customerID);
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export const getCartByCustomerID_customerController = async (req, res) => {
    if(req.user.role !== 'customer') {
        return res.status(403).json({ message: 'Please login as customer to view your cart.' });
    }
    try{
        const customerID = req.user.id;
        const result = await getCartByCustomerID(customerID);
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export const getCartByrestaurant_adminController = async (req, res) => {
    if(req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Please login as admin to view all carts by restaurant.' });
    }
    try{
        const { RestuarantID } = req.params;
        const result = await getCartByrestaurant(RestuarantID);
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

export const getCartByrestaurant_sellerController = async (req, res) => {
    if(req.user.role !== 'seller') {
        return res.status(403).json({ message: 'Please login as seller to view all carts by restaurant.' });
    }
    try{
        const  RestuarantID  = req.user.id;
        const result = await getCartByrestaurant(RestuarantID);
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}