import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {



  return (
    <div className="flex justify-center items-center max-w-[430px]">
      <div className="flex items-center flex-col container mx-12 my-auto p-5 bg-gray-50 shadow-lg min-h-[55vh] rounded-xl max-w-[400px] border border-solid border-gray-300">
        <h2 className="my-4">Page Not Found</h2>
        <button
        className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
      <button
        className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/signup")}
      >
        Signup
      </button>
      </div>
    </div>
  );
}
