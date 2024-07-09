import { Router } from "express";
import * as UC from "./user.controller.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as UV from "./user.validation.js";

const router = Router();


router.post("/register", validation(UV.registerValidation),UC.registerUser);
router.post("/login",validation(UV.loginValidation),UC.login);
router.get("/confirmEmail/:token", UC.confirmEmail);

export default router;
