// import { useEffect, useState } from "react";
// import { getLoggedUser } from "../data/api";
// import Welcome from "../components/Welcome"
// import Dashboard from "../components/Dashboard";

import { useNavigate } from "react-router-dom";

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
      <div className="fa fa-bar-chart" onClick={() => navigate("/watchlist")} />
      <div className="fa fa-user-o" />
      <div>
        <span className="fa fa-long-arrow-up" />
        <span className="fa fa-long-arrow-down" />
      </div>
      <div className="fa fa-industry" />
      <div className="fa fa-pie-chart" />
      <div className="fa fa-usd" />
      {/* {loggedUser ? <Dashboard loggedUser={loggedUser}/> : <Welcome />} */}
    </div>
  );
}
