import UserService from "../DB/services/user";
import out from "../helpers/out";
import { sign } from "../helpers/jwt";
import { compare } from "../helpers/bcrypt";

const userService = new UserService();

export default class User {
  async login(req, res) {
    try {
      const { password } = req.body;
      const user = await userService.get({ email: req.user });
      const passwordValidation = await compare(password, user[0].password);
      if (passwordValidation) {
        const token = sign({ user: user[0]._id, access: "user" });
        return out(
          res,
          { token, access: "user" },
          200,
          "Logged in successfully",
          undefined
        );
      }
      return out(
        res,
        undefined,
        401,
        "Invalid password and email combination",
        "CU0-0"
      );
    } catch (error) {
      console.log(`ERROR: ${error}`);
      return out(res, undefined, 500, "Internal server error", "CU0-1");
    }
  }
}
