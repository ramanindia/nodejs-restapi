import bcrypt from "bcrypt";
const { v4: uuidv4 } = require("uuid");
import { pool } from '../../db/connection';
import { utils } from '../../utils/utils';
import { JWTToken } from '../../middlewares/jwt';



export const userModel = {

  registerUser: async (requestData: any) => {
    //const randomPassword = utils.generatePassword(10);
    const password = requestData.password ?? "";
    const userPassword = bcrypt.hashSync(password.toString(), 10);
     const transporterID = requestData.transporterID ?? 0;
    const roleID = requestData.roleID ?? 2;
     const signupType = requestData.signupType ?? "website";
    const name = requestData.name ?? "";
     const email = requestData.email ?? "";
    const timezoneID = requestData.timezoneID ?? 27;
     const countryID = requestData.countryID ?? 101;
    const mobileNo = requestData.mobileNo ?? "";
     const address = requestData.address ?? "";
    const status = requestData.status ?? 1;

     var insertValue = [ uuidv4(),transporterID,roleID,timezoneID,signupType, name,email,countryID,mobileNo,address,
      userPassword, password, 1,1,status];
    var insertQuery =
      "insert into users set userUUID=? ,transporterID=?,roleID=?,timezoneID=?,signupType=?,name=?," +
      "email=?,countryID=?,mobileNo=?,address=?,password=?,plainPassword =?,addedBy=?,updatedBy=?,status=?";
       const resultdata  = await pool.query(insertQuery,insertValue);
    return resultdata;
  },
  loginUser: async (requestData: any) => {
    
    const email = requestData.email ?? "";
    const password = requestData.password ?? "";
     const loginType = requestData.loginType ?? "website";
      const ipAddress = requestData.ipAddress ?? "";
     const broswer = requestData.broswer ?? "";
    const browserVersion = requestData.browserVersion ?? "";

     const selectQuery =
        "select USER.* from users USER" +
        " where LOWER(email)=? and status=1  limit 0,1";

      const selectValue = [email.toLowerCase()];
      const [resultData]:any  = await pool.query(selectQuery,selectValue);
   
       if(resultData[0]) 
      {
      var data = resultData[0];
      if (data != null && data.password != "" && data.password != null) 
        {
        if( data.password != "" && bcrypt.compareSync(requestData.password, data.password)) 
        {
           const now = new Date();
          const lastlogin = now.toISOString().slice(0, 19).replace('T', ' '); // "YYYY-MM-DD HH:MM:SS"
          //update user details
          const updateQueryVal = [loginType,ipAddress,lastlogin,broswer,browserVersion,data.userID];
          const updateQuery = "update users set loginType=?,ipAddress=?,lastLogin=?,broswer=?,browserVersion=? where userID=? and status !=2";
          await pool.query(updateQuery,updateQueryVal);
            delete data.password;
            delete data.cpassword;
           // console.log('data======',data);
           const token =  JWTToken.getAccessToken(data);
            //console.log('token======',token12);
            const returndata:object = {accessToken:token};
           return returndata;

        } 
        else 
      {
        console.log("Invalid password");
      }
      }
      else 
      {
        console.log("Password is not presemnt in database");
      }
     
   // return "";
  } else 
  {
    console.log("invalid Email-id and Email id. it is not registered with us");
  }
  }

};