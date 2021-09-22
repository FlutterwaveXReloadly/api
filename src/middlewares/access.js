import { env } from "../config/env";
import { verify } from "../helpers/jwt";
import out from "../helpers/out";

function authenticate (targetLevel, givenLevel, user, errors, next, req, res) {
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
  authenticate(0, access, user, ["MA1-0", "MA1-1"], next, req, res);
};

export const isCompany = (req, res, next) => {
  const { access, user } = verify(req.headers["authorization"].split(" ")[1]);
  authenticate(1, access, user, ["MA2-0", "MA2-1"], next, req, res);
};

export const isAdmin = (req, res, next) => {
  const { access, user } = verify(req.headers["authorization"].split(" ")[1]);
  authenticate(2, access, user, ["MA2-0", "MA2-1"], next, req, res);
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

export const isRave = (req, res, next) => {
  try {
    const verifHash = req.headers["verif-hash"];
    if (verifHash !== env.RAVE_ENC_KEY) {
      return out(res, undefined, 422, "Resource access denied", "MA4-0");  
    }
    next();
  } catch (error) {
    console.log(error);
    out(res, { error }, 500, "Internal server error", "MA4-1");
  }
}