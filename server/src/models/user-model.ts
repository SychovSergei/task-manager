import { Model, model, Schema } from 'mongoose';

/** IUserModel - interface described information that store in database.
 *  */
export interface IUserModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
}

/** IUserRegistration - interface described information from registration form from client.*/
export type IUserRegistration = Pick<IUserModel, "firstName" | "lastName" | "email" | "password">;

/** IUserLogin - interface described information from login form from client.*/
export type IUserLogin = Pick<IUserModel, "email" | "password">;

const userSchema: Schema<IUserModel> = new Schema<IUserModel>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

const UserModel: Model<IUserModel> = model<IUserModel>("User", userSchema);

export default UserModel;
