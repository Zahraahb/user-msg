import userModel from "../../../db/models/user.model.js";
import { AppError } from "../../../utils/classError.js";
import { asyncHandler } from "../../../utils/globalErrorHandler.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import { sendEmail } from "../../../service/sendEmail.js";


//register
export const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password,OTP} = req.body;

  const emailExist = await userModel.findOne({ email });
  if (emailExist) {
    next(new AppError("user already exists", 409));
  }
  
  const token = jwt.sign(
    { email },
    "confirmeEmail"
  );
  const link = `http://localhost:3000/users/confirmEmail/${token}`;
  
  const checkEmail = await sendEmail(
    email,
    "hi",
    `<a href="${link}">confirm your email</a>`
  );
  if (!checkEmail) {
    next(new AppError("Email not send!", 409));
  }
  const hashPassword = bcrypt.hashSync(password, 10);
  const user = await userModel.create({
    username,
    email,
    password:hashPassword,
    OTP
  })
  return res.status(200).json({ msg: "check your email to confirm register" });

});

//comfirm email
export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, "confirmeEmail");
  if (!decoded?.email) {
    next(new AppError("Invalid payload", 409));
  }

  const user = await userModel.findOneAndUpdate(
    { email: decoded.email, confirmed: false },
    { confirmed: true },
    { new: true }
  );
  if (!user) {
    next(new AppError("user not found or already confirmed!", 409));
  }
  return res.status(200).json({ msg: "done" });
});

//login
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email, confirmed: true });
  const match = bcrypt.compareSync(password, user.password);
  if (!user || !match) {
    next(new AppError("wrong password or email!", 409));
    
  }

  const token = jwt.sign(
    { username: user.username, email: user.email, id: user.id },
    "zwzq",
  );
  return res.status(200).json({ msg: "user logged in successfully", token });
});