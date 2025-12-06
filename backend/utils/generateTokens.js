import jwt from "jsonwebtoken";

export const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const generateOTPToken = (userId, otp) => {
  return jwt.sign({ userId, otp }, process.env.JWT_SECRET, {
    expiresIn: "5m", // 5 minutes
  });
};

export default generateAccessToken;
