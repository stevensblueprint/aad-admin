import { type NextApiRequest, type NextApiResponse } from "next";
import NextAuth from "next-auth";
import { requestWrapper } from "../../../server/auth";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = requestWrapper(req, res);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await NextAuth(...data);
};

export default handler;
