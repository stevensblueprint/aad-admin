import { api } from "../../utils/api";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button, ButtonGroup, Box } from "@mui/material";
import { Profile } from "@prisma/client";

type ProfileProp = {
  profile: Profile;
};

const ButtonsList = (prop: ProfileProp) => {
  if (prop.profile.roleId == "MENTEE") {
    return (
      <ButtonGroup size="large" aria-label="Large button group">
        <Button>About</Button>
        <Button>Work</Button>
        <Button>Activity</Button>
        <Button>Mentors</Button>
      </ButtonGroup>
    );
  } else if (prop.profile.roleId == "MENTOR") {
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
        <title>Asian American Dream Admin</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-midnight-sky to-aero">
        <h1 className="mt-12 text-5xl font-bold text-[#F9F8F5]">
          Asian American Dream Admin
        </h1>
        <div className="mx-14 mt-20 flex flex-grow flex-col items-center justify-between">
          <Box
            sx={{
              width: 1356,
              height: 437,
              borderRadius: 100,
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            <div>
              <img src={data.image}></img>
              <p>{data.profile.preferredName}</p>
            </div>
          </Box>
          <ButtonsList profile={data.profile} />
        </div>
      </main>
    </>
  );
}
