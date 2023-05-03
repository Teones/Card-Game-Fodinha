import { User } from "@prisma/client";
import bcrypt from 'bcrypt';

import userRepository from "@/repositories/user-repository";
import { duplicatedEmailError } from './errors';

export async function createUser({email, password, username}: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  
  const user = await userRepository.create({
    email,
    password: hashedPassword,
    username,
  });

  return user;
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);

  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<User, 'email' | 'password' | 'username'>

const usersServices = {
  createUser,
};

export * from './errors';
export default usersServices;