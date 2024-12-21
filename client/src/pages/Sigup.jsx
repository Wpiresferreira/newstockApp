import { useEffect, useState } from "react";
import { getWatchlist } from "../controller/controller";
// import { getLoggedUser } from "../data/api";
// import Welcome from "../components/Welcome"
// import Dashboard from "../components/Dashboard";

export default function Signup() {
  const [watchlist, setWatchlist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve user information using the cookie
    async function getData() {
      const res = await getWatchlist();
      if(res.status>201) {
        setIsLoading(false);
        return
      }
      setIsLoading(false);
      setWatchlist(res.response);
    }
    getData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
    <div>
      <form>
        <input type="text">
        </input>
        <input type="password"></input>
       <button>Login</button> 
      </form>
    </div>
    </>
  );
}
