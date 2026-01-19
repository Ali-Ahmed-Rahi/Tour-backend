import AppError from "../../errorhandlers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import { generateToken } from "../../utils/jwt";
import { envVars } from "../../config/env";



const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload

  const isUserExist = await User.findOne({ email })

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not Exist")
  }

  const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, 'incorrect password')
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role
  }


  // const accessToken = jwt.sign(jwtPayload, "secret", {
  //   expiresIn: "1d"
  // })
  const accessToken=generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,"1d")



  return {
    email: isUserExist.email,
    accessToken: accessToken
  }

}





export const AuthServices = {
  credentialsLogin
}