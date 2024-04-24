import { useSession } from "next-auth/react";
import DefaultHome from "~/components/home/DefaultHome";
import AdminHome from "../components/home/AdminHome";
import UserHome from "../components/home/UserHome";

export default function Home() {
  const { data: sessionData } = useSession();

  if (!sessionData) return <DefaultHome />;

  if (sessionData.user.roleName === "ADMIN") {
    return <AdminHome sessionData={sessionData} />;
  }
  
  return <UserHome sessionData={sessionData}/>;
}