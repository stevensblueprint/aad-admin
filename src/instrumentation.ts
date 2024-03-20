import { db } from "./server/db";

export const register = async () => {
  try {
    await db.$connect();
    console.log("Database connection successful!");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
