import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

// TODO: Refactor Auth Middlewares
//to protect routes from unauthorized access
export const protect = asyncHandler(async (req, res, next) => {
  //initialize token variable
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //to split the token from "Bearer" thru empty space

      // token = req.headers.authorization.split(" ")[1];
      token = req.headers.authorization.split(",")[0].split(" ")[1];

      //decode the token by jwt.verify so we can have access to the payload (incl. user id) that has been passed in thru generateAccessToken
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //we don't want to return in the password in the req.user. This req.user can now be accessed with all of our protected routes.
      req.user = await User.findById(decoded.id).select("-password");

      if (req.user.forceLogin) {
        res.status(401);
        next(
          new Error(
            "Administrator-Updated Settings Detected. Please login again."
          )
        );
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Unauthorized, Token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized");
  }
});
