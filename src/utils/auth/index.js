import Logger from "../loaders/logger";
import jwt from "jsonwebtoken";
import config from "../config";

const generateToken = (user) => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  Logger.silly(`Sign JWT for userId: ${user.id}`);

  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      exp: exp.getTime() / 1000,
    },
    config.jwtSecret
  );
};
const AuthUtilities = {
  generateToken,
};
export default AuthUtilities;
