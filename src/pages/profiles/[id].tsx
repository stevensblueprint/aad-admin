import { api } from "../../utils/api";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button, ButtonGroup } from "@mui/material";
import type { Profile } from "@prisma/client";

type ButtonListProps = {
  profile: Profile;
};

const ButtonsList = ({ profile }: ButtonListProps) => {
  if (profile.roleId == "mentee") {
    return (
      <ButtonGroup size="large" aria-label="Large button group">
        <Button>About</Button>
        <Button>Work</Button>
        <Button>Activity</Button>
        <Button>Mentors</Button>
      </ButtonGroup>
    );
  } else if (profile.roleId == "mentor") {
    return (
      <ButtonGroup size="large" aria-label="Large button group">
        <Button>About Us</Button>
        <Button>AAD Programs</Button>
        <Button>AAD Open</Button>
        <Button>Donate</Button>
        <Button>Login</Button>
      </ButtonGroup>
    );
  }
};

interface Data {
  profile: {
    id: number;
    userId: string;
    preferredName: string | null;
    phoneNumber: string | null;
    bio: string | null;
    roleId: string;
  };
  image: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data, error, isLoading } = api.user.getById.useQuery({
    id: router.query.id as string,
  }) as { data: Data; error: unknown; isLoading: boolean };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  if (data.profile === null) {
    return <div>Error: User does not have a profile!</div>;
  }
  return (
    <>
      <Head>
        <title>{data.profile.preferredName} -- AAD</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-midnight-sky to-aero">
        <div className="mt-10 h-[300px] w-[90%] rounded-2xl bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.image} alt="profile"></img>
          <p>{data.profile.preferredName}</p>
          <p>Email: {data.email}</p>
        </div>
        <ButtonsList profile={data.profile} />
      </main>
    </>
  );
}
