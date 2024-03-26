import { PrismaClient } from "@prisma/client";
import { createRole, createUser } from "./createData";
const prisma = new PrismaClient();

const main = async () => {
  const adminRole = await createRole(prisma, "admin");
  const mentorRole = await createRole(prisma, "mentor");
  const menteeRole = await createRole(prisma, "mentee");
  const admin = await createUser(
    prisma,
    "admin0",
    "admin0@email.com",
    "First Admin",
    "2000-01-02",
    "Your Overlord",
    "+1 (000)-000-0000",
    "I am your overlord. Bow down to me!",
    "ADMIN",
    "Stevens Institute of Technology",
    ["Education", "Human Resources", "Retail"],
  );
  const mentor = await createUser(
    prisma,
    "mentor0",
    "mentor0@email.com",
    "First Mentor",
    "2005-05-20",
    "Saving Grace",
    "+1 (111)-111-1111",
    "I am your saving grace. I will help you!",
    "MENTOR",
    "Stevens Institute of Technology",
    ["Computer Science", "Chemical Engineering", "Information Technology"],
  );
  const mentee = await createUser(
    prisma,
    "mentee0",
    "mentee0@email.com",
    "First Mentee",
    "2004-10-11",
    "Near Helpless",
    "+1 (222)-222-2222",
    "I really need help!",
    "MENTEE",
    "Stevens Institute of Technology",
    ["Information Technology", "Economics", "Accounting"],
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
