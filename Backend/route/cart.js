import {
    createCartController, 
    removeFoodFromCartController,
    getAllCartController,
    getCartByCustomerID_adminController,
    getCartByCustomerID_customerController,
    getCartByrestaurant_adminController, 
    getCartByrestaurant_sellerController
} from '../controller/cart.js';

import { verifyToken } from '../auth/authCheck.js';

import express from 'express';

const cartRouter = express.Router();

cartRouter.post('/create', verifyToken, createCartController);
cartRouter.delete('/remove', verifyToken, removeFoodFromCartController);
cartRouter.get('/all', verifyToken, getAllCartController);
cartRouter.get('/customer/:customerID', verifyToken, getCartByCustomerID_adminController);
cartRouter.get('/customer', verifyToken, getCartByCustomerID_customerController);
cartRouter.get('/restaurant/:RestuarantID', verifyToken, getCartByrestaurant_adminController);
cartRouter.get('/restaurant', verifyToken, getCartByrestaurant_sellerController);

export default cartRouter;