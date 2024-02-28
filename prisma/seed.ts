import { PrismaClient, UserRole } from "@prisma/client";
import { Picsum } from "picsum-photos";

const prisma = new PrismaClient();

const createRole = async (prisma: PrismaClient, roleName: string) => {
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

const createUser = async (
  prisma: PrismaClient,
  id: string,
  email: string,
  name: string,
  roleName: string,
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
    },
  });
  const profile = await prisma.profile.upsert({
    where: {
      userId: user.id,
    },
    update: {},
    create: {
      userId: user.id,
      roleId: roleName,
    },
  });
  const roleUpdate = await prisma.userRole.update({
    where: {
      roleName: roleName,
    },
    data: {
      profiles: {
        connect: {
          id: profile.id,
        },
      },
    },
  });
  return user;
};

const main = async () => {
  const adminRole = await createRole(prisma, "admin");
  const mentorRole = await createRole(prisma, "mentor");
  const menteeRole = await createRole(prisma, "mentee");
  const admin = await createUser(
    prisma,
    "admin0",
    "admin0@email.com",
    "First Admin",
    "admin",
  );
  const mentor = await createUser(
    prisma,
    "mentor0",
    "mentor0@email.com",
    "First Mentor",
    "mentor",
  );
  const mentee = await createUser(
    prisma,
    "mentee0",
    "mentee0@email.com",
    "First Mentee",
    "mentee",
  );
  console.log({ admin, mentor, mentee });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
