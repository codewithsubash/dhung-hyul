import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import generateAccessToken from "../utils/generateTokens.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, confirmPassword, role, isActive } =
    req.body;

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already registered");
  }

  const newUser = await User.create({
    name,
    email,
    phone,
    password,
    role,
    isActive,
  });

  res.status(201).json({ userId: newUser._id, message: "User added" });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new Error("Email and password required.");

  const existingUser = await User.findOne({ email }).select("isActive");

  if (!existingUser) throw new Error("User doesn't exists!");

  if (!existingUser?.isActive)
    throw new Error("Account Deactivated! Please contact your administrator.");

  const user = await User.findById(existingUser?._id);

  //check if the user exist and if entered password is correct
  if (user && (await user.matchPassword(password))) {
    user.forceLogin = false;

    const editedUser = await user.save();

    res.json({
      _id: editedUser._id,
      name: editedUser.name,
      email: editedUser.email,
      role: editedUser.role,
      token: generateAccessToken(editedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});
