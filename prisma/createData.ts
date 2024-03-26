import type { PrismaClient } from "@prisma/client";
import { Picsum } from "picsum-photos";

export const createRole = async (prisma: PrismaClient, roleName: string) => {
  const role = await prisma.userRole.upsert({
    where: {
      roleName,
    },
    update: {},
    create: {
      roleName,
    },
  });
  return role;
};

export const createUser = async (
  prisma: PrismaClient,
  id: string,
  email: string,
  name: string,
  preferredName: string,
  phoneNumber: string,
  bio: string,
  roleName: string,
  school: string,
  blurb: string,
  industries: string[],
) => {
  const user = await prisma.user.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      id,
      name,
      email,
      image: Picsum.url({ height: 128, cache: false }),
      role: {
        connectOrCreate: {
          create: {
            roleName: roleName,
          },
          where: {
            roleName: roleName,
          },
        },
      },
      profile: {
        create: {
          bio,
          phoneNumber,
          preferredName,
          school,
          blurb,
          industries,
        },
      },
    },
  });
  return user;
};
