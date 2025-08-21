
import crypto from "crypto";

export const utils = {
  
  generatePassword : async (length: number = 10) => 
    {
  return crypto.randomBytes(length)
    .toString("base64")        // Converts to base64 string
    .slice(0, length)          // Trims to desired length
    .replace(/[+/=]/g, "A");   // Removes non-alphanumeric chars
},

};