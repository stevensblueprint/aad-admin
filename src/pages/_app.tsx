import CssBaseline from "@mui/material/CssBaseline";
import { type Session } from "next-auth";
import { SessionProvider, getSession } from "next-auth/react";
import { type AppContext, type AppProps } from "next/app";

import { api } from "~/utils/api";

import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { type NextPage } from "next";
import { type ReactElement, type ReactNode } from "react";
import "~/styles/globals.css";

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

const container = () => document.getElementById("__next")!;

// required to use tailwind classes in dialog, as by default MUI
// uses a portal to render the dialog outside of the root div
const theme = createTheme({
  components: {
    MuiDialog: {
      defaultProps: {
        container,
      },
    },
  },
});

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout & { session: Session | null }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledEngineProvider injectFirst>
          <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>,
        </StyledEngineProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const session = await getSession({ req: appContext.ctx.req });
  return { pageProps: { session } };
};

export default api.withTRPC(MyApp);
