import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import config from "../../config";
import userService, { IUserRespond } from "../services/user-service";
import UserModel, { IUserLogin, IUserModel } from "../models/user-model";
import ApiError from "../errors/api-error";
import UserError from "../errors/user-error";
import UserDto from "../dtos/user-dto";

class AuthController {

  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      /** register new user */
      const {firstName, lastName, email, password } = req.body as IUserModel;
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return next(ApiError.BadRequest("register/valid", "Validation error", errors.array()))
      }
      const userData: IUserRespond<UserDto> = await userService.registration({ firstName, lastName, email, password });

      /** send refreshToken to client in cookie */
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
      /** httpOnly: true - чтобы нельзя было изменять и получать внутри браузера */
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as IUserLogin;
      const userData: IUserRespond<UserDto> = await userService.login({ email, password });

      /** send refreshToken to client in cookie */
      res.cookie("refreshToken", userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });
      /** httpOnly: true - чтобы нельзя было изменять и получать внутри браузера */
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout (req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const toket = await userService.logout();

      res.send()
    } catch (e) {
      next(e);
    }

  }

  async activate (req: Request, res: Response, next: NextFunction) {
    try {
      await userService.activateUser(req.params.link);
      return res.redirect(config.clientUrl!);
    } catch (e) {
      next(e);
    }
  }

  async refresh (req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {
      next(e);
    }
  }

  login(req: Request, res: Response) {
    res.status(200).json({name: "Serg"});
  }

}

export default new AuthController();
