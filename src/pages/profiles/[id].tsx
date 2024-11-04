import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import ErrorPage from "../../components/error/error";
import DefaultLoadingPage from "../../components/loading/loading";
import About from "../../components/profiles/About";
import Mentee from "../../components/profiles/Mentee";
import Mentor from "../../components/profiles/Mentor";
import ProfileHeader from "../../components/profiles/ProfileHeader";
import TabList from "../../components/profiles/TabList";
import { api } from "../../utils/api";

export default function ProfilePage() {
  useSession({ required: true });

  const [section, setSection] = useState("about");

  const router = useRouter();
  const { data, error, isLoading } = api.user.getById.useQuery({
    id: router.query.id as string,
  });
  if (isLoading) return <DefaultLoadingPage />;
  if (error) return <ErrorPage errorMessage={error.message} />;
  if (data.profile === null) {
    return <div>Error: User does not have a profile!</div>;
  }

  return (
    <>
      <Head>
        <title>
          {data.profile.preferredName ?? data.name ?? "Profile"} - AAD
        </title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-midnight-sky to-aero">
        <ProfileHeader
          name={data.profile.preferredName ?? data.name ?? "Missing Name"}
          image={data.image}
          phoneNumber={
            data.profile?.phoneNumber
              ? data.profile.phoneNumber
              : "Missing Phone Number"
          }
          email={data.email}
          roleName={data.roleName}
        />
        <TabList
          roleName={data.roleName}
          section={section}
          setSection={setSection}
        />
        {section === "about" ? (
          <About
            preferredName={
              data.profile?.preferredName
                ? data.profile.preferredName
                : "Missing Preferred Name"
            }
            bio={data.profile?.bio ? data.profile.bio : "Missing Bio"}
          />
        ) : section === "mentor" ? (
          <Mentor
            preferredName={
              data.profile?.preferredName
                ? data.profile.preferredName
                : "Missing Preferred Name"
            }
          />
        ) : section === "mentee" ? (
          <Mentee
            preferredName={
              data.profile?.preferredName
                ? data.profile.preferredName
                : "Missing Preferred Name"
            }
          />
        ) : null}
      </main>
    </>
  );
}
