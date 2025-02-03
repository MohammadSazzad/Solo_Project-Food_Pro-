import { createPaymentController, failPaymentController, successPaymentController } from '../controller/payment.js';
import express from 'express';

const paymentRouter = express.Router();

paymentRouter.post('/create', createPaymentController);
paymentRouter.post('/success/:tran_id', successPaymentController);
paymentRouter.post('/fail/:tran_id', failPaymentController);

export default paymentRouter;