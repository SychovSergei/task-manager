import { Document } from "mongoose";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

import config from "../../config";
import UserModel, { IUserLogin, IUserModel, IUserRegistration } from "../models/user-model";
import mailService from "../services/mail-service";
import tokenService from "../services/token-service";
import UserDto from "../dtos/user-dto";

import UserError from "../errors/user-error";
import { ITokens } from "../models/token.model";

export interface IUserRespond<T> extends ITokens {
  user: T
}

class UserService {

  async registration(userData: IUserRegistration): Promise<IUserRespond<UserDto>> {
    const {firstName, lastName, email, password} = userData;
    const candidate: (Document & IUserModel) | null = await UserModel.findOne({ email });
    if (candidate) {
      throw UserError.AlreadyExists(email);
    }

    const hashPassword: string = await bcrypt.hash(password, 10);
    const activationLink: string = uuidv4();

    const user: Document & IUserModel = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      activationLink
    });
    await mailService.sendActivationMail(email, `${config.apiUrl}/api/auth/activate/${activationLink}`);

    const userFromDbDto: UserDto = new UserDto(user);
    const tokens: ITokens = tokenService.generateTokens({ ...userFromDbDto });
    await tokenService.saveToken(userFromDbDto.id, tokens.refreshToken);

    return { ...tokens, user: userFromDbDto }
  }

  async login(userData: IUserLogin): Promise<IUserRespond<UserDto>> {
    const { email, password } = userData;
    const user: (Document & IUserModel) | null = await UserModel.findOne({ email });
    if (!user) {
      throw UserError.NotFound(userData.email);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw UserError.WrongPassword();
    }
    const userFromDbDto: UserDto = new UserDto(user);
    const tokens: ITokens = await this._saveTokensWithData(userFromDbDto);
    return { ...tokens, user: userFromDbDto }
  }

  private async _saveTokensWithData(userFromDbDto: UserDto): Promise<ITokens> {
    const tokens: ITokens = tokenService.generateTokens({ ...userFromDbDto });
    await tokenService.saveToken(userFromDbDto.id, tokens.refreshToken);
    return tokens;
  }

  async activateUser(activationLink: string) {
    //TODO isActivated must be in separate collection in DB ??
    const user: (Document & IUserModel) | null = await UserModel.findOne({ activationLink });
    if (!user) {
      throw UserError.WrongActivationLink();
    }
    if (user.isActivated) {
      throw UserError.AlreadyActivated();
    }
    user.isActivated = true;
    await user.save();
  }

  async logout() {

  }
}

const  userService = new UserService();

export default userService;
