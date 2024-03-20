import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { type RoleName } from "../server/auth";

export default function useProtectedPage(roles: RoleName[]) {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (!session || !roles.includes(session.user.roleName)) {
      void router.push({
        pathname: "/",
      });
    }
  }, [session, router, roles]);
}
