import { ValidationError } from "express-validator";

import ApiError from "./api-error";

class UserError extends ApiError {

  constructor(status: number, code: string, message: string, errors: ValidationError[] = []) {
    super(status, `user/${ code }`, message, errors);
  }

  static BadRequest = (code: string, message: string) => new UserError(400, code, message);

  static AlreadyExists(email: string) {
    return new UserError(409, "already-exists", `User with email: ${email} already exists`);
  }

  static NotFound(email?: string) {
    const message = email ? `Not found` : `User with email: ${email} not found`;
    return new UserError(404, "not-found", message);
  }

  static WrongPassword() {
    return new UserError(409, "wrong-password", "Password is incorrect");
  }

  static WrongActivationLink() {
    return new UserError(400, "wrong-activation-link", "Activation link is incorrect");
  }

  static AlreadyActivated() {
    return new UserError(400, "already-activated", "User was already activated by this link.");
  }

}

export default UserError;
