import { db } from "./server/db";

export const register = async () => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      await db.$connect();
      console.log("Database connection successful!");
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
};
