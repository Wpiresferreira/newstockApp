import { useEffect, useState } from "react";
import {
  addToWatchlist,
  getAllCompanies,
  getWatchlist,
  removeFromWatchlist,
} from "../controller/controller";
// import { getLoggedUser } from "../data/api";
// import Welcome from "../components/Welcome"
import BoxLeft from "../components/BoxLeft";
import BoxRigth from "../components/BoxRigth";
// import Dashboard from "../components/Dashboard";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allCompanies, setAllCompanies] = useState([]);
  const [isLoadingAllCompanies, setIsLoadingAllCompanies] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterCompanies, setFilterCompanies] = useState([]);

  useEffect(() => {
    // Retrieve user information using the cookie
    async function getData() {
      const res = await getWatchlist();
      if (res.status > 201) {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setWatchlist(res.response);
    }
    getData();
  }, []);

  useEffect(() => {
    // Retrieve user information using the cookie
    async function getData() {
      const res = await getAllCompanies();
      if (res.status > 201) {
        setIsLoadingAllCompanies(false);
        return;
      }
      setIsLoadingAllCompanies(false);
      setAllCompanies(res.response);
    }
    getData();
  }, []);

  useEffect(() => {
    console.log(searchValue);
    if (searchValue.length === 0) {
      setFilterCompanies([]);
    }
    if (searchValue.length > 0) {
      const listFiltered = allCompanies.filter(
        (company) =>
          (company.symbol + " " + company.description).substring(
            0,
            searchValue.length
          ) === searchValue.toUpperCase() ||
          company.description.substring(0, searchValue.length) ===
            searchValue.toUpperCase()
      );
      setFilterCompanies(listFiltered ? listFiltered : []);
    }
  }, [searchValue, allCompanies]);

  function handleSearchValueChange(e) {
    setSearchValue(e.target.value);
  }

  async function handleAddButton() {
    //Check if symbol is valid
    const checkValid = allCompanies.filter(
      (company) => company.symbol === searchValue.split(" ")[0].toUpperCase()
    );
    if (!checkValid[0]) {
      alert("Ticker Invalid");
      return;
    }
    //Check if symbol is already on Watchlist
    const checkAlreadyInWatchlist = watchlist.filter(
      (company) => company.ticker === searchValue.split(" ")[0].toUpperCase()
    );
    if (checkAlreadyInWatchlist[0]) {
      alert("Ticker Is Already Listed");
      return;
    }

    const result = await addToWatchlist(searchValue.split(" ")[0]);

    if (result.status === 200) {
      setWatchlist([
        ...watchlist,
        { ticker: searchValue.split(" ")[0].toUpperCase() },
      ]);
      setSearchValue("");
    }
  }

  async function handleDelete(e){

    console.log(e)
    const result = await removeFromWatchlist(e);

    if (result.status === 200) {
      const removed = watchlist.filter((company)=>company.ticker !== e)
      setWatchlist(removed);
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="content-start">
      {console.log(filterCompanies)}
      <div>
        <input
          className="border-2 border-black"
          type="text"
          value={searchValue}
          onChange={handleSearchValueChange}
        ></input>
        <button
          onClick={handleAddButton}
          className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <span className="fa fa-plus-circle text-white mr-2"></span>Add
        </button>
      </div>
      <ul className="absolute">

      {filterCompanies.map((company, index) => (
        <li
        key={index}
        className={`${
          index % 2 === 0 ? " bg-sky-50 " : "bg-white"
          } hover:font-bold `}
          onClick={(e) => setSearchValue(e.target.innerText)}
          >
          {company.symbol + " " + company.description}
        </li>
      ))}
      </ul>
      <div className="flex flex-col">
        {watchlist.map((item, index) => (
          <div key={index} className="flex">
            <BoxLeft ticker={item.ticker} />
            <BoxRigth handleDelete ={handleDelete} ticker={item.ticker} />
          </div>
        ))}
        <div className="fa fa-bar-chart" />
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
    </div>
  );
}
