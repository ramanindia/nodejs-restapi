import { Request, Response } from 'express';
import { z } from "zod";
import { userModel } from "../models/user";
import { pool } from '../../db/connection';
import { utilDatabase } from '../../utils/utilDatabase';
import { verifyToken, AuthenticatedRequest } from '../../middlewares/jwt';

// regisgter user
export const registerUser = async (req: Request, res: Response) => {
  try {
       const { email,mobileNo } = req.body;
      const checkEmailExits = await utilDatabase.checkAllReadyExits('users','email',email);
    if(checkEmailExits)
    {
      return res.status(400).json({
      errorStatus:true,
      message:req.t("user.emailExits"),
    });
    }

    const checkMobilenoExits = await utilDatabase.checkAllReadyExits('users','mobileNo',mobileNo);
    if(checkMobilenoExits)
    {
      return res.status(400).json({
      errorStatus:true,
      message:req.t("user.mobilenoExits"),
    });
    }

    // You can pass user data from request body if needed
    const [result]: any = await userModel.registerUser(req.body);
    res.status(201).json({
      message: req.t("user.registrationSucces"),
      data :{insertedID :result.insertId }
    });
  } catch (error: any) {
    res.status(500).json({
      errorStatus:true,
      message: req.t("internalError"),
      error: error?.message || "Unknown error",
      errorDetails: error || "Unknown error",
    });
  }
}

// login user
export const loginUser = async (req: Request, res: Response) => 
  {
  try {
    // You can pass user data from request body if needed
    const result : any = await userModel.loginUser(req.body);
    res.status(201).json({
      message: req.t("user.loggedintoSystem"),
        data :result.accessToken
    });
  } catch (error: any) {
    res.status(500).json({
      errorStatus:true,
      message: req.t("internalError"),
      error: error?.message || "Unknown error",
      errorDetails: error || "Unknown error",
    });
  }
}

/***Start My profile***/

export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    let query =
      "select USER.* from users USER  where userID =? limit 0,1";
       //let queryValue = TOKENOBJECT.id;
       let queryValue = 2;
       const [resultData]:any =  await pool.query(query,queryValue);
         if(resultData[0]) 
      {
      var data = resultData[0];
            delete data.password;
            delete data.cpassword;
      res.status(200).json({
      message: req.t("sucessFetchResult"),
        data : data
    });
  } else 
  {
      res.status(404).json({
      message: req.t("user.userNotFound"),
    });

  }
 } catch (error: any) {
    res.status(500).json({
      errorStatus:true,
      message: req.t("internalError"),
      error: error?.message || "Unknown error",
      errorDetails: error || "Unknown error",
    });
  }
};
/***End My profile***/

