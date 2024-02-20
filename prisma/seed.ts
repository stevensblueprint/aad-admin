import { PrismaClient } from "@prisma/client";
import { Picsum } from "picsum-photos";

const prisma = new PrismaClient();

const createUser = async (
  prisma: PrismaClient,
  id: string,
  email: string,
  name: string,
  role: string
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
  try {
      await prisma.userRole.upsert({
      where: {
        roleName: role
      },
      update: {
        profiles: {
          create: {
            userId: id,
          }
        }},
      create: {
        roleName: role,
        profiles: {
          create: {
            userId: id,
          }
        }
      }
    })
  } catch (e) {
    console.error(e);
  }
  return user;
};

const main = async () => {
  const admin = await createUser(
    prisma,
    "admin0",
    "admin0@email.com",
    "First Admin",
    "admin"
  );
  const mentor = await createUser(
    prisma,
    "mentor0",
    "mentor0@email.com",
    "First Mentor",
    "mentor"
  );
  const mentee = await createUser(
    prisma,
    "mentee0",
    "mentee0@email.com",
    "First Mentee",
    "mentee"
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