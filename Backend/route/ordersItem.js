import {
    createOrderItemController,
    getAllOrderItemsController,
    getOrderItemByIDController,
    getOrderItemByRestaurantIDController,
    getOrderItemByFoodIDController,
    getStatusController
} from '../controller/ordersItem.js';

import { verifyToken } from '../auth/authCheck.js';

import express from 'express';

const ordersItemRouter = express.Router();

ordersItemRouter.post('/create', verifyToken, createOrderItemController);
ordersItemRouter.get('/all', verifyToken, getAllOrderItemsController);
ordersItemRouter.get('/status/:customerID', verifyToken, getStatusController);
ordersItemRouter.get('/:orderID', verifyToken, getOrderItemByIDController);
ordersItemRouter.get('/restaurant/:restuarantID', verifyToken, getOrderItemByRestaurantIDController);
ordersItemRouter.get('/food/:foodID', verifyToken, getOrderItemByFoodIDController);

export default ordersItemRouter;