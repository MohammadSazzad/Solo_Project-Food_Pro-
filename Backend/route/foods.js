import { verifyToken } from "../auth/authCheck.js";
import { upload } from "../auth/multer.js";
import { createFoodDetailsController, createFoodImageController } from "../controller/foods.js";
import express from 'express';

const foodsRouter = express.Router();

foodsRouter.post('/image/:token', upload.single("file"), createFoodImageController);
foodsRouter.post('/details', verifyToken,createFoodDetailsController);

export default foodsRouter;