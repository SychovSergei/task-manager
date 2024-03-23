import { Router } from 'express';
const router = Router();
import loginController from "../controllers/authController";

router.post("/register", loginController.register);
router.post("/registration",
  loginController.registration);
router.post("/login", loginController.login);
router.post("/logout", loginController.logout);
router.get("/activate/:link", loginController.activate);
router.get("/refresh", loginController.refresh);

router.get("/users", loginController.getUsers);

export default router;
