import { verifyToken } from "../auth/authCheck.js";
import { upload } from "../auth/multer.js";
import { createTempAdminController, verifyAdminController, adminLoginController, createAdminImageController, removeAdminImageController } from "../controller/admin.js";
import express from 'express';

const adminRouter = express.Router();

adminRouter.post('/register', createTempAdminController);
adminRouter.get('/verify-email/:token', verifyAdminController);
adminRouter.post('/login', adminLoginController);
adminRouter.post('/image/:token', upload.single("file"), createAdminImageController);
adminRouter.put('/image/remove', verifyToken, removeAdminImageController);

export default adminRouter;