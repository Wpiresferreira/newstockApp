// import { useEffect, useState } from "react";
// import { getLoggedUser } from "../data/api";
// import Welcome from "../components/Welcome"
// import Dashboard from "../components/Dashboard";
import Background from "../assets/background.png";

import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import MiniBox from "../components/MiniBox";
// import Interval from "react-interval-rerender";
// import Marquee from "../components/Marquee";

export default function Home() {
  const navigate = useNavigate();

  // const [loggedUser, setLoggedUser] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Retrieve user information using the cookie
  //   async function getData() {
  //     const res = await getLoggedUser();
  //     if(res.status>201) {
  //       setIsLoading(false);
  //       return
  //     }
  //     setIsLoading(false);
  //     setLoggedUser(res.response);
  //   }
  //   getData();
  // }, []);

  // if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      {/* <Interval delay={1000}> */}
        {/* {() => ( */}
          <Marquee className="bg-black text-white">
              <MiniBox ticker={"AAPL"} />
              <MiniBox ticker={"MSFT"} />
              <MiniBox ticker={"GOOG"} />
              <MiniBox ticker={"TSLA"} />
          </Marquee>
        {/* )} */}
      {/* </Interval> */}
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
