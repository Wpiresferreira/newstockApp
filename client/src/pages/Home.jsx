import { useNavigate, useOutletContext } from "react-router-dom";
import Marquee from "react-fast-marquee";
import MiniBox from "../components/MiniBox";
import { doGuestLogin } from "../controller/controller";

export default function Home() {
  const { setShowAlert, setTypeAlert, setMessageAlert } = useOutletContext();
  const navigate = useNavigate();

  async function guestLogin(){
    const result = await doGuestLogin()
    if (result.status == 200) {
      localStorage.setItem("token", result.response.token);

      setShowAlert(true);
      setTypeAlert("sucess");
      setMessageAlert(result.response.message);

      setTimeout(() => {
        navigate("/assets");
      }, 1000);
    }else{
      setShowAlert(true);
      setTypeAlert("alert");
      setMessageAlert(result.response.message);
    }
  }

  return (
    <div className="flex flex-col">
      <Marquee className="bg-black text-white">
        <MiniBox ticker={"AAPL"} />
        <MiniBox ticker={"MSFT"} />
        <MiniBox ticker={"GOOG"} />
        <MiniBox ticker={"TSLA"} />
      </Marquee>
      <div
        className={`bg-[url('/background.png')] bg-cover h-[80vh]  bg-center m-3 rounded border-2 border-solid border-sky-500 p-5`}
      >
        <h1 className="font-bold text-white bg-opacity-80 bg-sky-800 rounded-2xl p-2 my-5">
          Stock Simulator
        </h1>
        
        <div className="flex flex-col text-white font-bold text-right italic ">
          <div className="bg-sky-800 bg-opacity-80 rounded-xl p-2 w-[60%] self-end m-2">
            Try buy and sell over <br></br>27,400 US Stocks, ADRs, <br></br>ETFs
            and much more.
          </div>
          <div className="bg-sky-800 bg-opacity-80 rounded-xl p-2 w-[60%] self-end m-2">
            Gain confidence without risks of losses.
          </div>
        </div>
        <button
          className="m-2 bg-blue-900 hover:bg-white text-white hover:text-sky-900 font-bold py-2 px-4 rounded hover:boder-2 hover:border-solid hover:border-sky-900  "
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="m-2 bg-blue-900 hover:bg-white text-white hover:text-sky-900 font-bold py-2 px-4 rounded hover:boder-2 hover:border-solid hover:border-sky-900  "
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      <button
      className="m-2 bg-blue-900 hover:bg-white text-white hover:text-sky-900 font-bold py-2 px-4 rounded hover:boder-2 hover:border-solid hover:border-sky-900  "
      onClick={guestLogin}
      > Try as a Guest </button>
      </div>
      <br></br>
      <br></br>
      <h3 className="text-right mr-4">©Copyright 2024 Wagner Pires Ferreira</h3>
      {/* <div className="fa fa-bar-chart" onClick={() => navigate("/watchlist")} />
      <div className="fa fa-user-o" />
      <div>
        <span className="fa fa-long-arrow-up" />
        <span className="fa fa-long-arrow-down" />
      </div>
      <div className="fa fa-industry" />
      <div className="fa fa-pie-chart" />
      <div className="fa fa-usd" /> */}

      {/* {loggedUser ? <Dashboard loggedUser={loggedUser}/> : <Welcome />} */}
    </div>
  );
}
