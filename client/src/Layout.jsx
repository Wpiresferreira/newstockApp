import { Outlet } from "react-router-dom";
import Top from "./components/Top";
// import Top from "./components/Top";
// import Footer from "./components/Footer";

const Layout = () => {
  return (
    <main className="grid grid-rows-[60px_auto] min-h-[100vh]">
      <Top />
      <Outlet />
      {/* <Footer/> */}
    </main>
  );
};

export default Layout;
