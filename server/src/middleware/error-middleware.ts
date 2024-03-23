import { Request, Response } from "express";

import ApiError from "../errors/api-error";

export default function(err: Error, req: Request, res: Response, next: Function) {
  console.log('middleware error', err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ code: err.code, message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Unknown error" });
}
