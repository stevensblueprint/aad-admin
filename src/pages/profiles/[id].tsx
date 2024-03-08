import { api } from "../../utils/api";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button, ButtonGroup, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

type ButtonListProps = {
  roleName: string;
};

const ButtonsList = ({ roleName }: ButtonListProps) => {
  const [section, setSection] = useState('left');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setSection(newAlignment);
  };

  const children = [
    <ToggleButton value="About" key="about">
      <Button>About</Button>
    </ToggleButton>,
    <ToggleButton value="Work" key="work">
      <Button>Work</Button>
    </ToggleButton>,
    <ToggleButton value="Activity" key="activity">
      <Button>Activity</Button>
    </ToggleButton>,
    <ToggleButton value="Mentors" key="mentors">
      <Button>Mentors</Button>
    </ToggleButton>,
  ];

  const control = {
    value: section,
    onChange: handleChange,
    exclusive: true,
  };

  if (roleName == "MENTEE") {
    return (
      <ToggleButtonGroup size="large" {...control} aria-label="Large sizes">
        {children}
      </ToggleButtonGroup>
    );
  } else if (roleName == "MENTOR") {
    return (
      <ToggleButtonGroup size="large" {...control} aria-label="Large sizes">
        {children}
      </ToggleButtonGroup>
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
        <div className="mt-10 h-96 w-4/5 rounded-2xl bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.image} alt="profile"></img>
          <p>{data.profile.preferredName}</p>
          <p>Email: {data.email}</p>
        </div>
        <ButtonsList roleName={data.roleName} />
        <Button variant="outlined" href={`/settings/${data?.id}`}>
          {"Settings"}
        </Button>
      </main>
    </>
  );
}