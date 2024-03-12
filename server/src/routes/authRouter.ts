import { Router } from 'express';
const router = Router();
import loginController from "../controllers/authController";

router.post("/register", loginController.register);
router.post("/login", loginController.login);

export default router;
