// import { resolve } from "path";
import UserService from "../DB/services/user";
import out from "../helpers/out";
import { sign, verify } from "../helpers/jwt";
import { compare, hash } from "../helpers/bcrypt";
// import { uploader } from "../helpers/cloudinary";
import { env } from "../config/env";
import mailer from "../helpers/mailer";
import WalletService from "../DB/services/wallets";

const userService = new UserService();
const walletService = new WalletService();
export default class User {
  async login(req, res) {
    try {
      const { password, email } = req.body;
      const user = await userService.get({ email });
      if (user.length === 0) {
        return out(
          res,
          undefined,
          404,
          "Invalid password and email combination",
          "CU0-0"
        );
      }
      console.log(user);
      if (user[0].isVerified === false) {
        return out(res, undefined, 403, "Email not verified", "CU0-1");
      }
      const passwordValidation = await compare(password, user[0].password);
      if (passwordValidation) {
        const token = sign({ user: user[0].id, access: user[0].type });
        return out(
          res,
          { token, access: user[0].type },
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
        "CU0-1"
      );
    } catch (error) {
      console.log(`ERROR: ${error}`);
      return out(res, undefined, 500, "Internal server error", "CU0-2");
    }
  }

  async signup(req, res) {
    try {
      const { password } = req.body;
      const duplicate = await userService.get({ email: req.body.email });
      if (duplicate.length > 0) {
        return out(res, undefined, 409, "Email already exists", "CU1-0");
      }
      const user = await userService.add({
        ...req.body,
        type: Number(req.params.type),
        password: await hash(password),
        // image: await uploader(resolve(req.file.path)),
        isVerified: false,
      });
      if (user) {
        const verifyToken = sign({ user: user._id, access: user.type });
        await mailer("verifyEmail", {
          to: req.body.email,
          subject: "Email verification",
          data: {
            link: `${env.HOST}/v1/users/verify?token=${verifyToken}`,
          },
        });
        const wallet = await walletService.createWallet({ user: user._id, amount: 0 });
        console.log(wallet);
        return out(res, user, 201, "Signed up successfully!", undefined);
      }
      return out(res, undefined, 500, "Internal server error", "CU1-1");
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
      return out(res, undefined, 500, "Internal server error", "CU1-2");
    }
  }

  async verify(req, res) {
    try {
      const { token } = req.query;
      const { user } = verify(token);
      if (!user) {
        return res.redirect(302, `${env.FRONTEND_HOST}/400`);
      }
      const userData = await userService.update(
        { _id: user },
        { isVerified: true }
      );
      console.log(userData);
      if (userData) {
        return res.redirect(302, `${env.FRONTEND_HOST}`);
      } else {
        return res.redirect(302, `${env.FRONTEND_HOST}/400`);
      }
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
      return res.redirect(302, `${env.FRONTEND_HOST}/500`);
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await userService.get({ email });
      if (user.length === 0) {
        return out(res, undefined, 404, "Email not found", "CU2-0");
      } else {
        const token = sign({ user: user[0]._id });
        await mailer("forgotPassword", {
          to: user[0].email,
          subject: "Password reset",
          data: {
            link: `${env.FRONTEND_HOST}/reset?token=${token}`,
          },
        });
        return out(res, undefined, 200, "Email sent", undefined);
      }
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
      return out(res, undefined, 500, "Internal server error", "CU2-1");
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, password } = req.body;
      const { user } = verify(token);
      if (!user) {
        return out(res, undefined, 404, "Email not found", "CU3-0");
      }
      const userData = await userService.update(
        { _id: user },
        { password: await hash(password) }
      );
      if (userData) {
        return out(res, undefined, 200, "Password was reset", undefined);
      } else {
        return out(res, undefined, 500, "Internal server error", "CU3-1");
      }
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
      return out(res, undefined, 500, "Internal server error", "CU3-2");
    }
  }

  async updateUser(req, res) {
    try {
      const { user } = req;
      const { password } = req.body;
      const raw = {
        ...req.body,
        password: password && (await hash(password)),
      };
      const update = await userService.update({ _id: user }, raw);
      console.log(update);
      if (update.modifiedCount === 1 || update.matchedCount === 1) {
        return out(
          res,
          undefined,
          200,
          "User information was updated",
          undefined
        );
      }
      return out(res, undefined, 500, "Internal server error", "CU4-0");
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
      return out(res, undefined, 500, "Internal server error", "CU4-1");
    }
  }

  async pullUser(req, res) {
    try {
      const { user } = req;
      const userData = await userService.get({ _id: user });
      if (userData.length === 0) {
        return out(res, undefined, 404, "User not found", "CU5-0");
      }
      return out(
        res,
        userData[0],
        200,
        "User information was pulled",
        undefined
      );
    } catch (error) {
      console.log(`ERROR: ${error.message}`);
      return out(res, undefined, 500, "Internal server error", "CU5-1");
    }
  }
}
