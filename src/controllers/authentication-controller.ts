import { Request, Response } from "express";
import httpStatus from "http-status";

import { SignIn } from "@/services";

export async function SignInPost(req: Request, res: Response) {
  const { email, password } = req.body;

  const result = await SignIn({email, password})

  res.status(httpStatus.OK).send(result);
};