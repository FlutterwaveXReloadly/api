import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const sign = (payload) => {
  return jwt.sign(payload, env.SECRET, { expiresIn: "1d" });
};

export const verify = (token) => {
    return jwt.verify(token, env.SECRET);
}