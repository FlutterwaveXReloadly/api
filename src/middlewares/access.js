import { verify } from "../helpers/jwt";
import out from "../helpers/out";

const access = (targetLevel, givenLevel, user, errors, next, res) => {
  try {
    if (targetLevel === givenLevel || givenLevel === 2) {
      req.user = user;
      next();
    } else {
      out(res, undefined, 422, "Resource access denied", errors[0]);
    }
  } catch (err) {
    console.log(err);
    out(res, { err }, 500, "Internal server error", errors[1]);
  }
};

export const isNormalUser = (req, res, next) => {
  const { access, user } = verify(req.headers["authorization"].split(" ")[1]);
  access(1, access, user, ["MA1-0", "MA1-1"], next, res);
};

export const isCompany = (req, res, next) => {
  const { access, user } = verify(req.headers["authorization"].split(" ")[1]);
  access(2, access, user, ["MA2-0", "MA2-1"], next, res);
};

export const isLoggedIn = (req, res, next) => {
  try {
    const { access, user } = verify(req.headers["authorization"].split(" ")[1]);
    if (access >= 0) {
      req.user = user;
      next();
    } else {
      out(res, undefined, 422, "Resource access denied", "MA3-0");
    }
  } catch (err) {
    console.log(err);
    out(res, { err }, 500, "Internal server error", "MA3-1");
  }
};