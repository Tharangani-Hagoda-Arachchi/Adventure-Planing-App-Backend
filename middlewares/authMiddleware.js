import jwt from "jsonwebtoken";
import { AppError } from "../utils/errorHandler.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("No token provided", 401, "AuthenticationError");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    throw new AppError("Invalid or expired token", 401, "AuthenticationError");
  }
};
