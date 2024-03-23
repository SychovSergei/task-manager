import { model, Model, Schema } from "mongoose";

/** IToken - Interface describing the model in the database
 *  (a collection of tokens dependent on the user's identifier).*/
interface ITokenModel {
  user: Schema.Types.ObjectId;
  refreshToken: string;
}

/** ITokens - interface describing the variety of tokens*/
export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

const tokenSchema: Schema<ITokenModel> = new Schema<ITokenModel>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, required: true },
});

const TokenModel: Model<ITokenModel> = model<ITokenModel>("Token", tokenSchema);
export default TokenModel;
