import UserModel from "../../../dataBase/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {handelError} from "../../middelware/handelError.js"
import {AppError} from '../../Utiletis/AppError.js'


//SignUp
export const signUp = handelError(async (req, res, next) => {
 
  const existingUser = await UserModel.findOne({ email: req.body.email });
  if (existingUser) return next(new AppError("email already exsist", 409));
  let newUser = new userModel(req.body);
  await newUser.save();
  res.json({ message: "success", newUser });
});

//LogIn
export const signIn = handelError(async (req, res, next) => {
  let { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new AppError("User not found. Please register.", 404));
  }
 

  const matched =  await bcrypt.compare(password, user.password);
  if (!matched) {
    return next(new AppError("Incorrect password.", 401));
  }

  const token = jwt.sign(
    { name: user.name, id: user._id, role: user.role },"treka");
  res.json({ message: "Welcome!", token });
});


// Authorization Middleware
 const protectRoutes = handelError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new AppError("Please Provide Invalied Token", 401));
  let decoded = await jwt.verify(token, "treka");


  let user = await UserModel.findById(decoded.id)
  if (!user) return next(new AppError("invalid user", 404));
 

  if (user.changePasswordAt) {
    let changePasswordTime = parseInt(user.changePasswordAt.getTime() / 1000);
    if (changePasswordTime > decoded.iat) return next(new AppError("Token Invalied", 401));
  }

  req.user = user;
  next();
});
export default protectRoutes;
