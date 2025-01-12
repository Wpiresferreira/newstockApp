import { useState } from "react";
import { doLogin } from "../controller/controller";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setShowAlert, setTypeAlert, setMessageAlert } = useOutletContext();

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await doLogin(email, password);
    console.log(await result);
    setPassword("");
    if (result.status == 200) {
      localStorage.setItem("token", result.response.token);

      setShowAlert(true);
      setTypeAlert("sucess");
      setMessageAlert(result.response.message);

      navigate("/watchlist");
    }else{
      setShowAlert(true);
      setTypeAlert("alert");
      setMessageAlert(result.response.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh] h-full">
      <form className="mx-4 flex items-center flex-col p-5 bg-sky-100 shadow-lg rounded-xl w-[90vw] border border-solid border-gray-300">
        <h1 className="my-4 text-lg font-bold">Login</h1>
        <div className="w-full">
          <label className="w-full block text-left">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-sky-50 p-3 rounded-lg border border-solid border-gray-300 mb-4 focus:shadow-lg"
            type="email"
            required
          ></input>
        </div>
        <div className="w-full">
          <label className="w-full block text-left">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-sky-50 p-3 rounded-lg border border-solid border-gray-300 mb-4 focus:shadow-lg"
            type="password"
          ></input>
        </div>
        <div>
          <button
            className={`text-sm text-white rounded-xl px-4 py-1 m-3 bg-sky-900 border-solid border-2 border-sky-900 hover:text-black hover:bg-sky-50 focus:shadow-lg`}
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </form>
      {/* {showMessage ? (
        <>
          <Alert
            showMessage={showMessage}
            message={alertMessage}
            onClick={hideMessage}
            type={typeAlert}
          />
        </>
      ) : null} */}
    </div>
  );
}
