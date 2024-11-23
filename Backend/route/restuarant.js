import { createTempRestuarantController, verifyRestuarantController, restuarantLoginController } from "../controller/restuarant.js";

import express from "express";

const restuarantRouter = express.Router();

restuarantRouter.post("/register", createTempRestuarantController);
restuarantRouter.get("/verify-email/:token", verifyRestuarantController);
restuarantRouter.post("/login", restuarantLoginController);

export default restuarantRouter;