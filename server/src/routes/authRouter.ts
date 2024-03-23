import { Router } from 'express';
const router = Router();
import { body } from "express-validator";

import loginController from "../controllers/authController";

router.post("/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  loginController.registration);
router.post("/login", loginController.login);
router.post("/logout", loginController.logout);
router.get("/activate/:link", loginController.activate);
router.get("/refresh", loginController.refresh);

router.get("/users", loginController.getUsers);

export default router;
