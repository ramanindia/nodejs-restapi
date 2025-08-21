import { z } from "zod";

export const registerUserSchema = z.object({
  body: z
    .object({
      transporterID: z.number({ message: "user.reqtransporterID" }),
      roleID: z.number({ message: "user.reqroleID" }),
      signupType: z
        .string({ message: "user.reqsignupType" })
        .min(1, { message: "user.reqsignupType" }),
      name: z
        .string({ message: "user.reqname" })
        .min(3, { message: "user.reqname" })
        .max(80, { message: "user.reqname" }),
      email: z
        .string({ message: "user.reqemail" })
        .email({ message: "user.reqvalidEmailid" }),
      timezoneID: z.number({ message: "user.reqtimezoneID" }),
      countryID: z.number({ message: "user.reqcountryID" }),
      mobileNo: z
        .string({ message: "user.reqmobileNo" })
        .min(4, { message: "user.reqmobileNo" })
        .max(20, { message: "user.reqmobileNo" }),
      address: z
        .string({ message: "user.reqaddress" })
        .min(10, { message: "user.reqaddress" })
        .max(400, { message: "user.reqaddress" }),
      password: z
        .string({ message: "user.reqpassword" })
        .min(6, { message: "user.reqpassword" }),
      cpassword: z
        .string({ message: "user.reqcpassword" })
        .min(6, { message: "user.reqcpassword" }),
      ipAddress: z
        .string({ message: "user.reqipAddress" })
        .min(6, { message: "user.reqipAddress" }),
    })
    .refine((data) => data.password === data.cpassword, {
      message: "user.redpasswordMismatch",
      path: ["cpassword"],
    }),
});

export const loginUserSchema = z.object({
  body: z
    .object({
      loginType: z
        .string({ message: "user.reqloginType" })
        .min(1, { message: "user.reqloginType" }),
      email: z
        .string({ message: "user.reqemail" })
        .email({ message: "user.reqvalidEmailid" }),
      password: z
        .string({ message: "user.reqpassword" })
        .min(6, { message: "user.reqpassword" }),
      ipAddress: z
        .string({ message: "user.reqipAddress" })
        .min(6, { message: "user.reqipAddress" }),
         broswer: z
        .string({ message: "user.reqbrowser" }),
         browserVersion: z
        .string({ message: "user.reqbrowserversion" }),
    })
});

