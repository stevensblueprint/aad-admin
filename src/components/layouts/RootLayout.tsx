import NavBar from "./Navbar";
import Footer from "./Footer";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="flex min-h-screen flex-col">{children}</div>
      <Footer />
    </>
  );
};

export default RootLayout;
