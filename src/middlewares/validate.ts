import { ZodSchema, ZodError, ZodIssue } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodSchema<any>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse({ body: req.body });
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.issues.map((e: ZodIssue) => ({
        field: e.path[1],
        message: req.t(e.message), // i18n translation
      }));
      return res.status(400).json({ errors });
    }
    // fallback for unknown errors
    return res.status(500).json({ message: "Internal server error" });
  }
};
