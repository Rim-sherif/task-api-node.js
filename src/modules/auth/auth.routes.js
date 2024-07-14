import express from 'express'
import * as authcontroller from './auth.controller.js'

const  authRouter = express.Router();

authRouter.post("/signup",authcontroller.signUp);
authRouter.post("/signin",authcontroller.signIn);


export default authRouter ;
