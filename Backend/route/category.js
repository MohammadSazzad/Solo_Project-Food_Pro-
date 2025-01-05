import {
    createCategoryController, 
    deleteCategoryController, 
    updateCategoryController,
    getAllCategoriesController,
    getCategoryByIdController,
    createCategoryImageController
} from '../controller/category.js';
import { verifyToken } from '../auth/authCheck.js';
import { upload } from "../auth/multer.js";

import express from 'express';

const categoryRouter = express.Router();

categoryRouter.post('/create', verifyToken, createCategoryController);
categoryRouter.post('/image/:token', upload.single("file"), createCategoryImageController);
categoryRouter.delete('/delete/:categoryID', verifyToken, deleteCategoryController);
categoryRouter.put('/update/:categoryID', verifyToken, updateCategoryController);
categoryRouter.get('/all', getAllCategoriesController);
categoryRouter.get('/:categoryID', getCategoryByIdController);

export default categoryRouter;