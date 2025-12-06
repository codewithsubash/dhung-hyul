import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import mongoose from "mongoose";
import generateAccessToken, {
  generateOTPToken,
} from "../utils/generateTokens.js";
import { sendWelcomeEmail } from "../email/sendMail.js";
import { randomString } from "../utils/randomString.js";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, confirmPassword, role, isActive } =
    req.body;

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const session = await mongoose.startSession();
  let newUser;

  await session.withTransaction(async () => {
    const existing = await User.findOne({ email }).session(session);

    if (existing) {
      throw new Error("Email already registered");
    }

    newUser = await User.create(
      [
        {
          name,
          email,
          phone,
          password,
          role,
          isActive,
        },
      ],
      { session }
    );
  });

  const hostName = `${req.protocol}://${req.headers.host}`;

  await sendWelcomeEmail({
    user: newUser[0],
    hostName,
  });

  session.endSession();

  res.status(201).json({ userId: newUser[0]._id, message: "User added" });
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
      avatar: editedUser.avatar,
      token: generateAccessToken(editedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

export const userDetail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) throw new Error("User Not Found");

  res.status(200).json(user);
});

export const editUserProfile = asyncHandler(async (req, res) => {
  const { name, email, phone, avatar } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      phone,
      avatar,
    },
    { new: true }
  );

  if (!updatedUser) throw new Error("User Not Found!");

  res.status(200).json(updatedUser);
});

export const editUserProfilePassword = asyncHandler(async (req, res) => {
  const { previousPassword, password } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) throw new Error("User Not Found!");

  const currentPasswordMatched = await user.matchPassword(previousPassword);
  if (!currentPasswordMatched)
    throw new Error("Current Password didn't matched!");

  const isOldPassword = await user.matchPassword(password);
  if (isOldPassword)
    throw new Error("New password cannot be same as old password!");

  user.password = password;
  const editedUser = await user.save();

  res.status(204).json(editedUser);
});

export const addUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    autoGeneratePassword,
    password = 123456,
    role,
    phone,
  } = req.body;

  let _newUserPassword = password;

  if (autoGeneratePassword) {
    _newUserPassword = randomString(8);
  }

  try {
    const user = await User.create({
      name,
      email,
      phone,
      password: _newUserPassword,
      role,
    });

    const hostName = `${req.protocol}://${req.headers.host}`;

    await sendWelcomeEmail({
      user,
      hostName,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
});
export const editUser = asyncHandler(async (req, res) => {
  const { name, email, role, phone } = req.body;

  const existingUser = await User.findById(req.params.id);
  if (!existingUser) {
    res.status(404);
    throw new Error("User not found");
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      phone,
      role,
    },
    {
      new: true,
    }
  );
  res.status(200).json(user);
});

export const listUser = asyncHandler(async (req, res) => {
  const {
    active = "true",
    limit = 10,
    page = 1,
    search = "",
    sortBy = "createdAt",
    role = "System",
    sortDirection = -1,
  } = req.query;

  const users = await User.aggregate([
    {
      $match: {
        name: { $regex: new RegExp(search, "i") },
        role,
        isActive: active === "true",
      },
    },
    {
      $facet: {
        data: [
          { $sort: { [sortBy]: parseInt(sortDirection) } },
          { $skip: (parseInt(page) - 1) * parseInt(limit) },
          { $limit: parseInt(limit) },
        ],
        count: [{ $count: "total" }],
      },
    },
  ]);

  res.status(200).json({
    data: users[0].data,
    totalItems: users[0]?.count[0]?.total ?? 0,
  });
});

export const getUserDetail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) throw new Error("User Not Found");

  res.status(200).json(user);
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    throw new Error("User's doesn't exist! Please provide a valid user email.");

  const otp = randomString(6);

  user.otp = generateOTPToken(user._id, otp);

  await user.save();

  console.log(otp);

  // const hostName = `${req.protocol}://${req.headers.host}`;
  // // process.env.NODE_ENV === "development"
  // //   ? "http://localhost:3000"
  // //   : `${req.protocol}://${req.headers.host}`;

  // sendForgotPasswordLink({
  //   hostName,
  //   user,
  //   otp,
  //   account: user.selectedEntity.entity.account,
  //   req,
  //   domainCheck: true,
  // });

  res
    .status(200)
    .json({ message: `Reset password instructions sent to ${user?.email}.` });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, password, otp } = req.body;

  const __decodeJWT = async () => {
    try {
      return jwt.verify(user.otp, process.env.JWT_SECRET);
    } catch (error) {
      if (
        error?.name === "JsonWebTokenError" ||
        error?.name === "TokenExpiredError"
      )
        throw new Error(
          "OPT expired! Please redo the forgot password process."
        );
    }
  };
  // try {
  const user = await User.findOne({ email });

  if (!user)
    throw new Error("User's doesn't exist! Please provide a valid user email.");
  const decoded = await __decodeJWT(user?.otp);

  if (!decoded) throw new Error("Undefined OTP! Please try again.");

  if (decoded.otp !== otp?.trim())
    throw new Error(
      "Invalid OTP! Please check the otp you received properly and try again."
    );

  const _isOldPassword = await user.matchPassword(password);
  if (_isOldPassword)
    throw new Error("New password cannot be same as old password!");

  user.password = password?.trim();
  user.otp = null;

  await user.save();
  // const hostName = `${req.protocol}://${req.headers.host}`;

  // await sendResetPasswordLink({
  //   user: {
  //     ...JSON.parse(JSON.stringify(user)),
  //     password: password,
  //   },
  //   account: user.selectedEntity.entity.account,
  //   hostName,
  //   domainCheck: true,
  // });

  res.status(200).json({
    message:
      "Password reset successful. You can sign in with your new password.",
  });
});
