import { Outlet } from "react-router-dom";
import Top from "./components/Top";
import Alert from "./components/Alert";
import { useEffect, useState } from "react";
import Contact from "./components/Contact";

export default function Layout() {
  const [showAlert, setShowAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState(false);


  return (
    <main className="flex flex-col items-center bg-sky-50 w-screen min-h-[100vh]">
      <Top />
      <Outlet context={{setShowAlert, setTypeAlert, setMessageAlert}} />
      <Alert showAlert={showAlert} setShowAlert={setShowAlert}  typeAlert={typeAlert} messageAlert={messageAlert} />
      <div className="h-[200px]"></div>
      <Contact/>
    </main>
  );
}
