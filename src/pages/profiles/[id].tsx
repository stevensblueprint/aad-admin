import { api } from "../../utils/api";
import { useRouter } from "next/router";
import Head from "next/head";
import { Button, Tabs, Tab, Box } from "@mui/material";
import {
  useState,
  Fragment,
  type Dispatch,
  type SetStateAction,
  type ReactElement,
} from "react";
import DefaultLoadingPage from "../../components/loading/defaultLoadingPage";
import AvatarWrapper from "../../components/settings/AvatarWrapper";
import { type Data } from "../../components/settings/EditProfile";
import { grey } from "@mui/material/colors";

const ProfileHeader = ({ data }: { data: Data }) => {
  const info = [
    {
      key: "Role",
      value: data.roleName.charAt(0) + data.roleName.slice(1).toLowerCase(),
    },
    { key: "Email", value: data.email },
    { key: "Phone", value: data.profile.phoneNumber },
  ];

  return (
    <div className="mb-5 mt-10 h-72 w-4/5 rounded-2xl bg-white">
      <div className="flex h-full flex-row items-center">
        <div className="p-8">
          <AvatarWrapper
            alt={data.name ? data.name : ""}
            src={data.image ? data.image : ""}
            sx={{ width: 200, height: 200 }}
            variant="rounded"
          />
        </div>
        <div className="flex flex-grow flex-col px-4 py-8">
          <p className="pb-2 text-center text-3xl font-bold">{data.name}</p>
          <div className="grid grid-cols-12 gap-2 p-2">
            {info.map((item) => {
              return (
                <Fragment key={item.key}>
                  <p className="col-span-3 text-2xl text-gray-500">
                    {item.key}:
                  </p>
                  <p className="col-span-9 text-2xl">{item.value}</p>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const TabList = ({
  roleName,
  section,
  setSection,
}: {
  roleName: string;
  section: string;
  setSection: Dispatch<SetStateAction<string>>;
}) => {
  const handleChange = (event: React.SyntheticEvent, newAlignment: string) => {
    setSection(newAlignment);
  };

  const menteeTabs = [
    <Tab label="About" value="about" key="about" />,
    <Tab label="Mentor" value="mentor" key="mentor" />,
  ];

  const mentorTabs = [
    <Tab label="About" value="about" key="about" />,
    <Tab label="Mentees" value="mentee" key="mentee" />,
  ];

  let selectedTabs = [];

  if (roleName == "MENTEE") {
    selectedTabs = menteeTabs;
  } else if (roleName == "MENTOR") {
    selectedTabs = mentorTabs;
  } else {
    selectedTabs = [<Tab label="About" value="about" key="about" />];
  }

  return (
    <div className="m-4 rounded-xl bg-white p-2">
      <Tabs value={section} onChange={handleChange}>
        {selectedTabs}
      </Tabs>
    </div>
  );
};

const About = ({ data }: { data: Data }) => {
  return (
    <div className="m-4 w-4/5 rounded-xl bg-white p-8">
      <p className="text-center text-3xl font-bold">About</p>
      <p className="text-xl font-light">Preferred Name</p>
      <Box
        component="span"
        sx={{
          display: "block",
          fontSize: 20,
          bgcolor: grey[200],
          m: 1,
          p: 1,
          borderRadius: 2,
        }}
      >
        {data.profile.preferredName}
      </Box>
      <p className="text-xl font-light">Bio</p>
      <Box
        component="span"
        sx={{
          display: "block",
          fontSize: 20,
          bgcolor: grey[200],
          m: 1,
          p: 1,
          borderRadius: 2,
        }}
      >
        {data.profile.bio}
      </Box>
    </div>
  );
};

const Mentee = ({ data }: { data: Data }) => {
  return (
    <div className="m-4 w-4/5 rounded-xl bg-white p-8">
      <p className="text-center text-3xl font-bold">Mentees</p>
      <Box
        component="span"
        sx={{
          display: "block",
          fontSize: 20,
          bgcolor: grey[200],
          m: 1,
          p: 1,
          borderRadius: 2,
        }}
      >
        Information about matched Mentees for <i>{data.profile.preferredName}</i> can be here
      </Box>
    </div>
  );
};

const Mentor = ({ data }: { data: Data }) => {
  return (
    <div className="m-4 w-4/5 rounded-xl bg-white p-8">
      <p className="text-center text-3xl font-bold">Mentor</p>
      <Box
        component="span"
        sx={{
          display: "block",
          fontSize: 20,
          bgcolor: grey[200],
          m: 1,
          p: 1,
          borderRadius: 2,
        }}
      >
        Information about matched Mentor for <i>{data.profile.preferredName}</i> can be here
      </Box>
    </div>
  );
};

export default function ProfilePage() {
  const [section, setSection] = useState("about");

  const router = useRouter();
  const { data, error, isLoading } = api.user.getById.useQuery({
    id: router.query.id as string,
  });
  if (isLoading) return <DefaultLoadingPage />;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  if (data.profile === null) {
    return <div>Error: User does not have a profile!</div>;
  }

  const tabs: Record<string, ReactElement> = {
    about: <About data={data} />,
    mentor: <Mentor data={data} />,
    mentee: <Mentee data={data} />,
  };

  return (
    <>
      <Head>
        <title>{data.name} - AAD</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-midnight-sky to-aero">
        <ProfileHeader data={data as Data} />
        <TabList
          roleName={data.roleName}
          section={section}
          setSection={setSection}
        />
        {tabs[section]}

        {/* To be moved to navbar */}
        <Button variant="contained" href={`/settings/${data?.id}`}>
          {"Settings"}
        </Button>
      </main>
    </>
  );
}
