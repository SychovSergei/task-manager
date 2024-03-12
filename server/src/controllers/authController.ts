import { Request, Response } from 'express';

class AuthController {

  register(req: Request, res: Response) {

  }

  login(req: Request, res: Response) {
    res.status(200).json({name: "Serg"});
  }

}

export default new AuthController();
