import { Container } from "@mui/material";
import Head from "next/head";

export default function DefaultHome() {
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
          <Container>
            <p className="text-base text-[#F9F8F5]">
              Founded in May 2021, our mission is to provide mentorship
              networks, professional development training, and career
              advancement opportunities for underserved Pan Asian American
              undergraduates, with the goal of helping them achieve their unique
              vision of the Asian American dream. Since our inception, we’ve had
              752 unique students register for our programming. However, with
              more than 1 million Pan Asian American undergraduates (and
              growing), there is work to be done.
            </p>
          </Container>
        </div>
      </main>
    </>
  );
}
