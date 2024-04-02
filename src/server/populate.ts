import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { createUser } from "prisma/createData";

const prisma = new PrismaClient();

//I'm just hard coding the schools since Faker doesn't have an equivalent
const schools: string[] = [
  "Stevens Institute of Technology",
  "Rutgers University",
  "New York University",
  "Princeton University",
  "Columbia University",
  "Harvard University",
  "Massachusetts Institute of Technology",
  "Stanford University",
  "University of California, Berkeley",
  "Northwestern University",
  "University of Chicago",
  "University of Illinois at Urbana-Champaign",
  "University of Michigan",
  "University of Pennsylvania",
];
//doing the same hard coding some industries
const industries: string[] = [
  "Software Engineering",
  "Computer Science",
  "Product Management",
  "Data Science",
  "Civil Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Biomedical Engineering",
  "Chemical Engineering",
  "Visual Arts and Design",
  "Business",
  "Finance",
  "Marketing",
  "Sales",
  "Human Resources",
  "Teaching",
  "Research",
  "Healthcare",
  "Medical",
];

const populate = async (role: string, count: number) => {
  for (let i = 0; i <= count; i++) {
    const name = faker.person.fullName();
    let industryLowerBound = Math.floor(Math.random() * industries.length);
    let industryUpperBound = Math.floor(Math.random() * industries.length);
    if (industryLowerBound > industryUpperBound) {
      [industryLowerBound, industryUpperBound] = [
        industryUpperBound,
        industryLowerBound,
      ];
    }

    await createUser(prisma, {
      id: faker.string.uuid(),
      email: faker.internet.email({
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
      }),
      name: name,
      dateOfBirth: faker.date
        .birthdate({ min: 16, max: 40, mode: "age" })
        .toISOString()
        .slice(0, 10),
      preferredName: name,
      phoneNumber: faker.helpers.fromRegExp("+1 ([0-9]{3})-[0-9]{3}-[0-9]{4}"),
      bio: faker.lorem.paragraph(),
      roleName: role,
      university: schools[Math.floor(Math.random() * schools.length)]!,
      industries: industries.slice(industryLowerBound, industryUpperBound),
    });
  }
};

//populate mentees
await populate("MENTEE", 250);
//popualte mentors
await populate("MENTOR", 125);

await prisma.$disconnect();
