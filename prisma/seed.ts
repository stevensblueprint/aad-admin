import { PrismaClient } from "@prisma/client";
import { createRole, createUser, createAnnouncement, createKinMatchingCycle } from "./createData";
const prisma = new PrismaClient();

const main = async () => {
  const adminRole = await createRole(prisma, "ADMIN");
  const mentorRole = await createRole(prisma, "MENTOR");
  const menteeRole = await createRole(prisma, "MENTEE");
  const admin = await createUser(prisma, {
    id: "admin0",
    email: "admin0@email.com",
    name: "First Admin",
    dateOfBirth: "2000-01-02",
    preferredName: "First Admin",
    phoneNumber: "+1 (000)-000-0000",
    bio: "Your Overlord",
    roleName: "ADMIN",
    university: "Stevens Institute of Technology",
    industries: ["Education", "Human Resources", "Retail"],
  });

  const mentor = await createUser(prisma, {
    id: "mentor0",
    email: "mentor0@email.com",
    name: "First Mentor",
    preferredName: "First Mentor",
    dateOfBirth: "2005-05-20",
    phoneNumber: "+1 (111)-111-1111",
    bio: "Saving Grace",
    roleName: "MENTOR",
    university: "Stevens Institute of Technology",
    industries: [
      "Computer Science",
      "Chemical Engineering",
      "Information Technology",
    ],
  });

  const mentee = await createUser(prisma, {
    id: "mentee0",
    email: "mentee0@email.com",
    name: "First Mentee",
    dateOfBirth: "2004-10-11",
    preferredName: "First Mentee",
    phoneNumber: "+1 (222)-222-2222",
    bio: "Near Helpless",
    roleName: "MENTEE",
    university: "Stevens Institute of Technology",
    industries: ["Information Technology", "Economics", "Accounting"],
  });

  const announcementInfo = await createAnnouncement(prisma, {
    message: "Welcome! We are excited to have you here!",
    type: "info",
  });

  const announcementWarning = await createAnnouncement(prisma, {
    message: "Please remember to complete your profile! Deadline Approaching soon!",
    type: "warning",
  });

  const kinMatchingCycle = await createKinMatchingCycle(prisma, {
    cycleName: "2024 Matching Cycle",
    dueDate: new Date("2024-12-31"),
    formDisplayName: "2024 Kin Mentorship Matching Form",
    isOpen: true,
  });

  const kinMatchingCycleClosed = await createKinMatchingCycle(prisma, {
    cycleName: "2024 Matching Cycle [Closed]",
    dueDate: new Date("2024-11-31"),
  });

  const kinMatchingCycleArchived = await createKinMatchingCycle(prisma, {
    cycleName: "2023 Matching Cycle",
    dueDate: new Date("2023-12-31"),
    archived: true,
  });
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
