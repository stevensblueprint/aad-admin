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

const main = async () => {
  const adminRole = await createRole(prisma, "admin");
  const mentorRole = await createRole(prisma, "mentor");
  const menteeRole = await createRole(prisma, "mentee");
  const admin = await createUser(
    prisma,
    "admin0",
    "admin0@email.com",
    "First Admin",
    "Your Overlord",
    "+1 (000)-000-0000",
    "I am your overlord. Bow down to me!",
    "ADMIN",
    "Stevens Institute of Technology",
    "I am an admin. I am your overlord!",
    ["Software Engineering", "Product Management", "Data Science"],
  );
  const mentor = await createUser(
    prisma,
    "mentor0",
    "mentor0@email.com",
    "First Mentor",
    "Saving Grace",
    "+1 (111)-111-1111",
    "I am your saving grace. I will help you!",
    "MENTOR",
    "Monsters University",
    "I am a mentor. I will help you!",
    ["Software Engineering", "Biomedicine", "Data Science"],
  );
  const mentee = await createUser(
    prisma,
    "mentee0",
    "mentee0@email.com",
    "First Mentee",
    "Near Helpless",
    "+1 (222)-222-2222",
    "I really need help!",
    "MENTEE",
    "Stevens Institute of Technology",
    "I am a mentee. I need help!",
    ["Software Engineering", "Computer Science", "Data Science"],
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
