// import { useEffect, useState } from "react";
// import { getLoggedUser } from "../data/api";
// import Welcome from "../components/Welcome"
// import Dashboard from "../components/Dashboard";
import Background from "../assets/background.png";

import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee"
import MiniBox from "../components/MiniBox";
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
      <Marquee className="bg-black text-white">
        <MiniBox ticker={"AAPL"}/>
        <MiniBox ticker={"MSFT"}/>
        <MiniBox ticker={"GOOGL"}/>
        <MiniBox ticker={"TSLA"}/>
      </Marquee>
      <div className={`bg-[url('/background.png')] bg-cover bg-center m-3 rounded border-2 border-solid border-sky-500 p-5`}>
        {/* <img
          src={Background}
          className="z-0 m-[-20px] h-[250px] w-[4000]"
        ></img> */}
        <div className="text-white font-bold text-right italic">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          Try buy and sell over <br></br>27,400 US Stocks, ADRs, <br></br>ETFs and much more.
          <br></br>
          <br></br>
          <br></br>
          Gain confidence without risks of losses.
        </div>
      </div>
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
