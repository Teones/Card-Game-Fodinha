import { Router } from "express";

import { validateBody } from "@/middlewares";
import { createAuthSchema } from "@/schemas";
import { SignInPost } from "@/controllers";

const authenticationRouter = Router();

authenticationRouter
  .post('/', validateBody(createAuthSchema), SignInPost)

export { authenticationRouter };