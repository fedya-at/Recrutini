// middleware/auth.js

import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const secretKey = process.env.SECRET_KEY || "defaultSecretKey";

const authenticateUser = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] ||
      req.query.token ||
      req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({
          isAuthenticated: false,
          message: "Unauthorized: Missing token",
        });
    }

    const decodedToken = jwt.verify(token, secretKey);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ isAuthenticated: false, message: "Unauthorized: Invalid token" });
  }
};

export default authenticateUser;
