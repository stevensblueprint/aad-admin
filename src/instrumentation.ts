import { db } from "./server/db";

export const register = async () => {
  try {
    await db.$connect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
