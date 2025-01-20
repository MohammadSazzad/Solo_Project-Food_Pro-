import { verifyToken } from "../auth/authCheck.js";
import { upload } from "../auth/multer.js";
import { 
    createFoodDetailsController, 
    createFoodImageController, 
    getFoodsByFoodIDController, 
    getAllFoodsController, 
    getFoodsByCategoryController, 
    getFoodsByRestuarantIDController, 
    getFoodsByRestuarantID_AdminController,  
    deleteFoodByFoodIDController, 
    deleteFoodByRestuarantIDController,
    orderHistoryControler    
} from "../controller/foods.js";
import express from 'express';

const foodsRouter = express.Router();

foodsRouter.post('/image/:token', upload.single("file"), createFoodImageController);
foodsRouter.post('/details', verifyToken,createFoodDetailsController);
foodsRouter.get('/foodID/:foodID', verifyToken, getFoodsByFoodIDController);
foodsRouter.get('/food-list', verifyToken, getAllFoodsController);
foodsRouter.get('/category/:categoryID', getFoodsByCategoryController);
foodsRouter.get('/restuarant/', verifyToken, getFoodsByRestuarantIDController);
foodsRouter.get('/restuarant-admin/:RestuarantID', verifyToken, getFoodsByRestuarantID_AdminController);
foodsRouter.delete('/foodID/:foodID', verifyToken, deleteFoodByFoodIDController);
foodsRouter.delete('/restuarant/:RestuarantID', verifyToken, deleteFoodByRestuarantIDController);
foodsRouter.get('/order-history/:CustomerID', verifyToken, orderHistoryControler);

export default foodsRouter;