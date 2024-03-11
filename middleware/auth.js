import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import User from "../schemas/userSchemas.js";

export const authenticate = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const [bearer, token] = authorizationHeader.split(" ", 2);
    if (bearer !== "Bearer") {
      next(HttpError(401, "Not authorized"));
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }
    // console.log("user", user);
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};
