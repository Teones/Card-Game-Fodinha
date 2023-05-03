import Joi from "joi";

import { CreateSignInParams } from "@/services";

export const createAuthSchema = Joi.object<CreateSignInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});