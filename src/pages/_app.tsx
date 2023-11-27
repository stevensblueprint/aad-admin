import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PrimeReactProvider } from "primereact/api";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <PrimeReactProvider value={{ unstyled: true, pt: {} }}>
        <Component {...pageProps} />
      </PrimeReactProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
