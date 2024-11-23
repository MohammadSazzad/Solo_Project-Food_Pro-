import { upload } from "../auth/multer.js";
import { createTempRestuarantController, verifyRestuarantController, restuarantLoginController, restuarantOwnerImageController, removeRestuarantOwnerImageController } from "../controller/restuarant.js";

import express from "express";

const restuarantRouter = express.Router();

restuarantRouter.post("/register", createTempRestuarantController);
restuarantRouter.get("/verify-email/:token", verifyRestuarantController);
restuarantRouter.post("/login", restuarantLoginController);
restuarantRouter.post("/restuarantOwnerImage/:token", upload.single("file"), restuarantOwnerImageController);
restuarantRouter.put("/removeRestuarantOwnerImage/:token", removeRestuarantOwnerImageController);

export default restuarantRouter;