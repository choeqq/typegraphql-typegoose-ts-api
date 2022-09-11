import { ApolloError } from "apollo-server";
import { CreateUserInput, LoginInput, UserModel } from "../schema/user.schema";
import Context from "../types/context";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";

class UserService {
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
  }

  async login(input: LoginInput, context: Context) {
    const e = "Invalid email or password";
    // get user by email
    const user = await UserModel.find().findByEmail(input.email).lean();

    if (!user) {
      throw new ApolloError(e);
    }
    // validate the password
    const passwordIsValid = await bcrypt.compare(input.password, user.password);

    if (!passwordIsValid) {
      throw new ApolloError(e);
    }
    // sign jwt
    const token = signJwt();

    // set a cookie for the jwt

    // return the jwt
  }
}

export default UserService;
