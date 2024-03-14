import { api } from "../../utils/api";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import DefaultLoadingPage from "../../components/loading/defaultLoadingPage";
import AvatarWrapper from "../../components/settings/AvatarWrapper";
import { type Data } from "../../components/settings/EditProfile";

const ButtonsList = ({ roleName }: { roleName : string }) => {
  const [section, setSection] = useState("about");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setSection(newAlignment);
  };

  const menteeTabs = [
    <ToggleButton value="about" key="about">
      <Button>About</Button>
    </ToggleButton>,
    <ToggleButton value="mentors" key="mentors">
      <Button>Mentors</Button>
    </ToggleButton>,
  ];

  const mentorTabs = [
    <ToggleButton value="about" key="about">
      <Button>About</Button>
    </ToggleButton>,
    <ToggleButton value="mentees" key="mentees">
      <Button>Mentees</Button>
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
        {menteeTabs}
      </ToggleButtonGroup>
    );
  } else if (roleName == "MENTOR") {
    return (
      <ToggleButtonGroup size="large" {...control} aria-label="Large sizes">
        {mentorTabs}
      </ToggleButtonGroup>
    );
  }
};

const ProfileHeader = ({data} : { data : Data }) => {
  return (
    <div className="mt-10 h-80 w-4/5 rounded-2xl bg-white">
      <div className="flex h-full flex-row items-center">
        <div className="p-8">
          <AvatarWrapper
            alt={data.name ? data.name : ""}
            src={data.image ? data.image : ""}
            sx={{ width: 245, height: 245 }}
            variant="rounded"
          />
        </div>
        <div className="flex flex-grow flex-col px-4 py-8">
          <p className="text-center text-4xl font-bold">{data.name}</p>
          <div className="grid grid-cols-12 gap-2 p-2">
            <p className="col-span-3 text-3xl text-gray-500">Role:</p>
            <p className="col-span-9 text-3xl">
              {data.roleName.charAt(0) +
                data.roleName.slice(1).toLowerCase()}
            </p>
            <p className="col-span-3 text-3xl text-gray-500">Email:</p>
            <p className="col-span-9 text-3xl">{data.email}</p>
            <p className="col-span-3 text-3xl text-gray-500">Phone:</p>
            <p className="col-span-9 text-3xl ">
              {data.profile.phoneNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const router = useRouter();
  const { data, error, isLoading } = api.user.getById.useQuery({
    id: router.query.id as string,
  });
  if (isLoading) return <DefaultLoadingPage />;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  if (data.profile === null) {
    return <div>Error: User does not have a profile!</div>;
  }
  return (
    <>
      <Head>
        <title>{data.name} - AAD</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-midnight-sky to-aero">
        <ProfileHeader data={data as Data} />
        <ButtonsList roleName={data.roleName} />
        <Button variant="outlined" href={`/settings/${data?.id}`}>
          {"Settings"}
        </Button>
      </main>
    </>
  );
}
