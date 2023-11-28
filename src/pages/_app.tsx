import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PrimeReactProvider } from "primereact/api";
import designSystem from "../styles/designSystem";
// import Tailwind from "primereact/passthrough/tailwind"; // replace 'designSystem' in provider with 'Tailwind' for default PrimeReact styling
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <PrimeReactProvider value={{ unstyled: true, pt: designSystem }}>
        <Component {...pageProps} />
      </PrimeReactProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
