/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { UserServices } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { meta } from "zod/v4/core";


const createUser = catchAsync (async(req: Request, res: Response, next: NextFunction) => {

    const user = await UserServices.createUser(req.body)

    sendResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message:"User Created Successfully",
      data:user
    })

    res.status(httpStatus.CREATED).json({
      success:true,
      message: "User Created Successfully",
      data:user
    })
  
})

const getAllUsers = catchAsync (async(req: Request, res: Response, next: NextFunction) => {
  
  const users = await UserServices.getAllUsers()

  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"All Users Retrieved SuccessFully",
    data:users.data,
    meta:users.meta
  })

  })

  
  
  
  
  
  
  export const UserControllers = {
    createUser,
    getAllUsers
  }
  
  
  
  
  
  
  
  // example
  // const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const users = await userServices.getAllUsers()
  //     return users
  //   } catch (error) {
  //     console.log(error);
  //     next(error)
  //   }
  // }



  // const getAllUsers = catchAsync (async(req: Request, res: Response, next: NextFunction) => {
  
  // const users = await UserServices.getAllUsers()
  // res.status(httpStatus.OK).json({
  //   success:true,
  //     message:"All Users Retrieved SuccessFully",
  //     data:users
  //   })

  // })