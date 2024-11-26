import { createOrderController, updateOrderController, deleteOrderController, getAllOrdersController, getOrderByIDController } from "../controller/orders.js";

import { verifyToken } from "../auth/authCheck.js";

import express from 'express';

const ordersRouter = express.Router();

ordersRouter.post('/create', verifyToken, createOrderController);
ordersRouter.delete('/delete/:orderID', verifyToken, deleteOrderController);
ordersRouter.put('/update/:orderID', verifyToken, updateOrderController);
ordersRouter.get('/all', verifyToken, getAllOrdersController);
ordersRouter.get('/:orderID', verifyToken, getOrderByIDController);

export default ordersRouter;