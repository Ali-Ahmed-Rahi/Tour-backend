import { NextFunction, Request, Response } from "express";
import AppError from "../errorhandlers/AppError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";


export const checkAuth=(...authRoles:string[])=>(req: Request, res: Response, next: NextFunction) => {
  try {

    const accessToken = req.headers.authorization;
    if (!accessToken) {
      throw new AppError(403, "No Token Received")
    }

    // const verifiedToken = jwt.verify(accessToken, "secret")
    const verifiedToken=verifyToken(accessToken,envVars.JWT_ACCESS_SECRET) as JwtPayload
  

    if (!authRoles.includes(verifiedToken.role)) {
      throw new AppError(403,"You are not permitted ")
    }

    req.user=verifiedToken

    next()
  } catch (error) {
    next(error);
  }
}