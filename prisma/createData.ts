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
  userInput: {
    id: string;
    email: string;
    name: string;
    dateOfBirth: string;
    preferredName: string;
    phoneNumber: string;
    bio: string;
    roleName: string;
    university: string;
    industries: string[];
  },
) => {
  const {
    id,
    email,
    name,
    dateOfBirth,
    preferredName,
    phoneNumber,
    bio,
    roleName,
    university,
    industries,
  } = userInput;

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
          dateOfBirth,
          preferredName,
          university,
          industries,
        },
      },
    },
  });

  return user;
};

export const createAnnouncement = async (
  prisma: PrismaClient,
  announcementInput: {
    message: string;
    type?: "info" | "warning" | "error";
    expirationDate?: Date;
    active?: boolean;
  },
) => {
  const { message, type, expirationDate } = announcementInput;

  const announcement = await prisma.announcement.create({
    data: {
      message,
      type,
      expirationDate,
    },
  });

  return announcement;
}

export const createKinMatchingCycle = async (
  prisma: PrismaClient,
  kinMatchingInput: {
    cycleName: string;
    dueDate: Date;
    formDisplayName?: string;
    isOpen?: boolean;
    archived?: boolean;
  },
) => {
  const { cycleName, dueDate, formDisplayName, isOpen, archived } = kinMatchingInput;

  const kinMatchingCycle = await prisma.kinMatching.create({
    data: {
      cycleName,
      dueDate,
      formDisplayName,
      isOpen,
      archived,
    },
  });

  return kinMatchingCycle;
}
