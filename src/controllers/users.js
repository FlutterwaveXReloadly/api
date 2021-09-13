import { resolve } from 'path';
import UserService from "../DB/services/user";
import out from "../helpers/out";
import { sign } from "../helpers/jwt";
import { compare, hash } from "../helpers/bcrypt";
import { uploader } from "../helpers/cloudinary";

const userService = new UserService();

export default  class User {
  async login(req, res) {
    try {
      const { password, email } = req.body;
      const user = await userService.get({ email });
      if (user.length === 0) {
        return out(res, undefined, 404, 'Invalid password and email combination', 'CU0-0');
      }
      const passwordValidation = await compare(password, user[0].password);
      if (passwordValidation) {
        const token = sign({ user: user[0].id, access: "user" });
        return out(res, { token, access: "user" }, 200, 'Logged in successfully', undefined);
      }
        return out(res, undefined, 401, 'Invalid password and email combination', 'CU0-1');
    } catch (error) {
        console.log(`ERROR: ${error}`);
        return out(res, undefined, 500, 'Internal server error', 'CU0-2');
    }
  }
  
  async signup(req, res) {
    try {
      const { password } = req.body;
      const duplicate = await userService.get({ email: req.body.email });
      if (duplicate.length > 0) {
        return out(res, undefined, 409, 'Email already exists', 'CU1-0');
      }
      const user = await userService.add({
        ...req.body,
        password: await hash(password),
        image: await uploader(resolve(req.file.path)),
      });
      if (user) {
        return out(res, user, 201, 'Signed up well!', undefined);
      }
      return out(res, undefined, 500, 'Internal server error', 'CU1-1');
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
      return out(res, undefined, 500, 'Internal server error', 'CU1-2');
    }
  }
}
