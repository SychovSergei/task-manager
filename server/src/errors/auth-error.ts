import { ValidationError } from "express-validator";

import ApiError from "./api-error";

class AuthError extends ApiError {

  constructor(status: number, code: string, message: string, errors: ValidationError[] = []) {
    super(status, `auth/${code}`, message, errors);
  }

  static Unauthorized() {
    return new ApiError(401, "user-unauthorized", "Not authorized", []);
  }

}
