import jwt from "jsonwebtoken";
import config from "../..//config";
import tokenModel, { ITokens } from "../models/token.model";


class TokenService {

  generateTokens(payload: any): ITokens {
    const accessToken: string = jwt.sign(payload, config.jwt.accessKey!, { expiresIn: "15m" });
    const refreshToken: string = jwt.sign(payload, config.jwt.refreshKey!, { expiresIn: "1d" });

    return { accessToken, refreshToken }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({user: userId});
    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });

    return token;
  }

}

const tokenService = new TokenService();

export default tokenService;
