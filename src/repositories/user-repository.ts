import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
};

const userRepository = {
  create,
};

export default userRepository;