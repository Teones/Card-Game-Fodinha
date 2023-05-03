import { User } from "@prisma/client";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import { invalidCredentialsError } from "./error";

export async function SignIn({email, password}: CreateSignInParams): Promise<SignInResult> {
  const user = await validateEmailOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  delete user.password
  return {
    user,
    token,
  }
}

async function validateEmailOrFail(email: string): Promise<GetUserOrFailResult> {
  const registeredEmail = await userRepository.findByEmail(email);

  if (!registeredEmail) {
    throw invalidCredentialsError();
  }
  
  return registeredEmail;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = bcrypt.compareSync(password, userPassword);

  if (!isPasswordValid) {
    throw invalidCredentialsError();
  };
}

async function createSession(userId: number) {
  const token = jwt.sign({userId}, process.env.JWT_SECRET);

  await sessionRepository.create({
    token,
    userId
  });

  return token;
}

export type CreateSignInParams = Pick<User, 'email' | 'password'>;

type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

const authenticationService = {
  SignIn,
};

export default authenticationService;