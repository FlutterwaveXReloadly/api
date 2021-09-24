import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const sign = (payload) => {
  console.log(payload);
  return jwt.sign(payload, env.SECRET, { expiresIn: "30d" });
};

export const verify = (token) => {
    return jwt.verify(token, env.SECRET);
}