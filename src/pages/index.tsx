import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

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
          <p className="w-4/5 text-base text-[#F9F8F5]">
            &emsp; Founded in May 2021, our mission is to provide mentorship
            networks, professional development training, and career advancement
            opportunities for underserved Pan Asian American undergraduates,
            with the goal of helping them achieve their unique vision of the
            Asian American dream. Since our inception, we’ve had 752 unique
            students register for our programming. However, with more than 1
            million Pan Asian American undergraduates (and growing), there is
            work to be done.
          </p>
          <AuthShowcase />
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  return (
    <div className="mb-20 flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        <meta name="google-signin-client_id" content="428451178915-vdegqdfa0eaojeojn4b259mnedhmpag8.apps.googleusercontent.com" />
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
