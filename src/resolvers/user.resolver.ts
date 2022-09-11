import { Query, Resolver } from "type-graphql";
import { User } from "../schema/user.schema";

@Resolver()
export default class UserResolver {
  @Query(() => User)
  me() {
    return {
      _id: "123",
      name: "John Doe",
      email: "John Doe",
    };
  }
}
