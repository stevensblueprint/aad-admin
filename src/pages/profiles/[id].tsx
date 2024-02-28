import { api } from "../../utils/api";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button, ButtonGroup, Box } from "@mui/material";
import { Profile } from "@prisma/client";

type ButtonListProps = {
  profile: Profile;
};

const ButtonsList = ({ profile }: ButtonListProps) => {
  if (profile.roleId == "MENTEE") {
    return (
      <ButtonGroup size="large" aria-label="Large button group">
        <Button>About</Button>
        <Button>Work</Button>
        <Button>Activity</Button>
        <Button>Mentors</Button>
      </ButtonGroup>
    );
  } else if (profile.roleId == "MENTOR") {
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

export default function ProfilePage() {
  const router = useRouter();
  const { data, error, isLoading } = api.user.getById.useQuery({
    id: router.query.id as string,
  });
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
        <div className="mt-10 rounded-2xl w-[90%] h-[300px] bg-white">
          <img src={data.image} alt="profile" className=""></img>
          <p>{data.profile.preferredName}</p>
          <p>Email: {data.email}</p>
        </div>
        <ButtonsList profile={data.profile} />
      </main>
    </>
  );
}
