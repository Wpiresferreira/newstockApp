import { useNavigate, useOutletContext } from "react-router-dom";
import Marquee from "react-fast-marquee";
import MiniBox from "../components/MiniBox";
import { doGuestLogin } from "../controller/controller";

export default function Home() {
  const { setShowAlert, setTypeAlert, setMessageAlert } = useOutletContext();
  const navigate = useNavigate();

  async function guestLogin() {
    const result = await doGuestLogin()
    if (result.status == 200) {
      localStorage.setItem("token", result.response.token);

      setShowAlert(true);
      setTypeAlert("sucess");
      setMessageAlert(result.response.message);

      setTimeout(() => {
        navigate("/assets");
      }, 1000);
    } else {
      setShowAlert(true);
      setTypeAlert("alert");
      setMessageAlert(result.response.message);
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Marquee className="bg-black text-white">
        <MiniBox ticker={"AAPL"} />
        <MiniBox ticker={"MSFT"} />
        <MiniBox ticker={"GOOG"} />
        <MiniBox ticker={"TSLA"} />
      </Marquee>
      <div className="p-4 w-full md:w-3/6">
        <div
          className={`bg-[url('/background.png')]   bg-cover h-[80vh] bg-center m-3 rounded border-2 border-solid border-sky-500 p-5`}
        >
          <h1 className="bg-sky-800 bg-opacity-80 my-5 p-2 rounded-2xl font-bold text-white">
            Stock Simulator
          </h1>

          <div className="text-right flex flex-col font-bold text-white italic">
            <div className="bg-sky-800 bg-opacity-80 m-2 p-2 rounded-xl w-[60%] self-end">
              Try buy and sell over <br></br>27,400 US Stocks, ADRs, <br></br>ETFs
              and much more.
            </div>
            <div className="bg-sky-800 bg-opacity-80 m-2 p-2 rounded-xl w-[60%] self-end">
              Gain confidence without risks of losses.
            </div>
          </div>
          <button
            className="hover:border-sky-900 bg-blue-900 hover:bg-white m-2 px-4 py-2 hover:border-solid rounded font-bold text-white hover:text-sky-900 hover:boder-2"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="hover:border-sky-900 bg-blue-900 hover:bg-white m-2 px-4 py-2 hover:border-solid rounded font-bold text-white hover:text-sky-900 hover:boder-2"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
          <button
            className="hover:border-sky-900 bg-blue-900 hover:bg-white m-2 px-4 py-2 hover:border-solid rounded font-bold text-white hover:text-sky-900 hover:boder-2"
            onClick={guestLogin}
          > Try as a Guest </button>
        </div>
        <br></br>
        <br></br>
        <h3 className="text-right">©Copyright 2024 Wagner Pires Ferreira</h3>
        {/* <div className="fa fa-bar-chart" onClick={() => navigate("/watchlist")} />
      <div className="fa fa-user-o" />
      <div>
        <span className="fa-long-arrow-up fa" />
        <span className="fa-long-arrow-down fa" />
      </div>
      <div className="fa fa-industry" />
      <div className="fa fa-pie-chart" />
      <div className="fa fa-usd" /> */}

        {/* {loggedUser ? <Dashboard loggedUser={loggedUser}/> : <Welcome />} */}
      </div>
    </div>
  );
}
