import { type Session } from "next-auth";
import { SessionProvider, getSession } from "next-auth/react";
import { type AppContext, type AppProps } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { StyledEngineProvider } from "@mui/material";
import { type ReactElement, type ReactNode } from "react";
import { type NextPage } from "next";

import RootLayout from "~/components/layouts/RootLayout";

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout & { session: Session | null }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <StyledEngineProvider injectFirst>
        <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>,
      </StyledEngineProvider>
    </SessionProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const session = await getSession({ req: appContext.ctx.req });
  return { pageProps: { session } };
};

export default api.withTRPC(MyApp);
