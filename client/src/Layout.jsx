import { Outlet } from "react-router-dom";
import Top from "./components/Top";


export default function Layout(){
  return (
    <main className="flex flex-col min-h-[100vh] max-w-430px] bg-sky-50">
      <Top />
      <Outlet />
      {/* <Footer/> */}
    </main>
  );
};