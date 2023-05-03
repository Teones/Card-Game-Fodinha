import { ApplicationError } from "@/protocols";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export function handleApplicationErrors(
  err: ApplicationError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if(err.name === 'ConflictError' || err.name == 'DuplicatedEmailError') {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message
    });
  }

  if(err.name === 'InvalidCredentialsError') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message
    });
  }
}