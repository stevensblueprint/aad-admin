import Footer from "./Footer";
import NavBar from "./Navbar";

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
