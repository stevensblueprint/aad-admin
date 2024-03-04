import { type Session } from "next-auth";
import { SessionProvider, getSession } from "next-auth/react";
import { type AppContext, type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { StyledEngineProvider } from "@mui/material";

// withTRPC grabs the pageProps from getInitialProps and passes it to the component
// the generic here is the type of pageProps, which it expects to match with the return
// type of getInitialProps. tRPC looks for pageProps in the return of getInitialProps
// so the types don't match.
type PageProps = {
  session: Session | null;
};
const MyApp: AppType<{ pageProps: PageProps }> = (props) => {
  const { Component, pageProps } = props;
  const session = (pageProps as unknown as PageProps).session;
  return (
    <SessionProvider session={session}>
      <StyledEngineProvider injectFirst>
        <Component />
      </StyledEngineProvider>
    </SessionProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const session = await getSession({ req: appContext.ctx.req });
  return { pageProps: { session } };
};

export default api.withTRPC(MyApp);
