import { Response, Request } from "express";
import httpStatus from "http-status";

import { createUser } from "@/services";

export async function usersPost(req: Request, res: Response) {
  const { email, password, username } = req.body;

  const user = await createUser({email, password, username})

  res.status(httpStatus.CREATED).json({
    id: user.id,
    email: user.email,
    username: user.username,
  })
}