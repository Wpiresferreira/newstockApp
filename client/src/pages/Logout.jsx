import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { doLogout } from "../controller/controller";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {

    localStorage.clear()
      // async function getData() {
      //   const res = await doLogout();
      //   if (res.status > 201) {
      //     return;
      //   }
      // }
      // getData();
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }, []);

  return (
    <div className="flex justify-center items-center w-[100vw]">
      <div className="flex items-center flex-col container mx-12 my-auto p-5 bg-gray-50 shadow-lg min-h-[55vh] rounded-xl max-w-[400px] border border-solid border-gray-300">
        <h1 className="my-4">Session ended</h1>
      </div>
    </div>
  );
}
