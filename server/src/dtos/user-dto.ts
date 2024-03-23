import { Document } from "mongoose";

import { IUserModel } from "../models/user-model";

/** UserDto - class is used for filtering user's data before post into client side.
 *  UserDto data gets from database user collection */
class UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActivated: boolean;

  constructor(model: Document & IUserModel) {
    this.id = model._id;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.email = model.email;
    this.isActivated = model.isActivated;
  }

}

export default UserDto;
