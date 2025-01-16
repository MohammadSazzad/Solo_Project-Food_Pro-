import { createCustomerController , customerLoginController, getCustomerController, customerImageController, removeCustomerImageController, verifyCustomerController, updateCustomerDetailsController} from "../controller/customer.js";
import { upload } from "../auth/multer.js";
import express from "express";
import { verifyToken } from "../auth/authCheck.js";

const CustomerRouter = express.Router();

CustomerRouter.post("/register", createCustomerController);
CustomerRouter.post("/login", customerLoginController);
CustomerRouter.get("/verify-email/:token", verifyCustomerController);
CustomerRouter.get("/allCustomer", verifyToken, getCustomerController); 
CustomerRouter.post("/customerImage/:token", upload.single("file"), customerImageController);
CustomerRouter.put("/removeCustomerImage/:token", removeCustomerImageController);
CustomerRouter.put("/updateCustomer/:customerID", updateCustomerDetailsController);

export default CustomerRouter;
