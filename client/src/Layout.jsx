import { Outlet } from "react-router-dom";
import Top from "./components/Top";
// import Top from "./components/Top";
// import Footer from "./components/Footer";

const Layout = () => {
  return (
    <main className="flex flex-col min-h-[100vh] max-w-430px] bg-sky-50">
      <Top />
      <Outlet />
      {/* <Footer/> */}
    </main>
  );
};

export default Layout;
