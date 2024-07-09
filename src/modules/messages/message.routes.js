import { Router } from "express";
import * as MC from "./message.controller.js";
import { auth } from "../../middleware/auth.js";


const router = Router();
router.get("/",auth(), MC.readMessages);
router.post("/sendMessage", auth(), MC.sendMessage);
router.delete("/delete/:id", auth(), MC.deleteMessage);

export default router;
