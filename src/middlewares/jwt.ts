import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const expiresIn =  '1h';
const algorithm = "HS256";
const SECRET= "a-string-secret-at-least-256-bits-long";
const REFRESHSECRET = "a-string-secret-at-least-256-bits-long";
const RefreshExpiration =  "120000h";

export const JWTToken = {
  getAccessToken : (payload:any) => 
    {
    return jwt.sign(payload,SECRET, { algorithm:algorithm,expiresIn:expiresIn});
    },
};

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: req.t("tokenRequired"), });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('err===',err);
    return res.status(403).json({ message: req.t("invalidExpiredToken"), });
  }
};
