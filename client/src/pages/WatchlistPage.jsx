import { useEffect, useState } from "react";
import {
  addToWatchlist,
  getAllCompanies,
  getWatchlist,
  removeFromWatchlist,
} from "../controller/controller";
import BoxWatchlist from "../components/BoxWatchlist";
import { useNavigate } from "react-router-dom";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allCompanies, setAllCompanies] = useState([]);
  const [isLoadingAllCompanies, setIsLoadingAllCompanies] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterCompanies, setFilterCompanies] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user information using the localStorage
    async function getData() {
      const res = await getWatchlist();
      console.log(res);
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
    if (searchValue.length === 0) {
      setFilterCompanies([]);
    }
    if (searchValue.length > 0) {
      const listSorted = allCompanies.sort((a, b) => {
        if (a.ticker < b.ticker) {
          return -1;
        } else {
          return 1;
        }
      });
      const listFiltered = listSorted.filter(
        (company) =>
          (company.ticker + " " + company.profile.name).substring(
            0,
            searchValue.length
          ) === searchValue.toUpperCase() ||
          company.profile.name
            .substring(0, searchValue.length)
            .toUpperCase() === searchValue.toUpperCase()
      );
      setFilterCompanies(listFiltered ? listFiltered : []);
    }
  }, [searchValue, allCompanies]);


  function handleSearchValueChange(e) {
    setSearchValue(e.target.value);
  }

  async function handleAddButton(ticker) {
    //Check if symbol is not null or ""
    if (searchValue == null || searchValue == "") {
      return;
    }
   
    //Check if symbol is valid
    const checkValid = allCompanies.filter(
      (company) => company.ticker === ticker.split(" ")[0].toUpperCase()
    );
    if (!checkValid[0]) {
      alert("Ticker Invalid");
      return;
    }
    //Check if symbol is already on Watchlist
    const checkAlreadyInWatchlist = watchlist.filter(
      (company) => company.ticker === ticker.split(" ")[0].toUpperCase()
    );
    if (checkAlreadyInWatchlist[0]) {
      alert("Ticker Is Already Listed");
      setSearchValue("");
      return;
    }

    const result = await addToWatchlist(ticker.split(" ")[0]);
    console.log(result)
    if (result.status === 200) {
      setWatchlist([
        ...watchlist,
        { ticker: ticker.split(" ")[0].toUpperCase() },
      ]);
      setSearchValue("");
    }
  }

  function handleEditButton() {
    setIsEditMode(!isEditMode);
  }

  async function handleDelete(e) {
    console.log(e);
    const result = await removeFromWatchlist(e);

    if (result.status === 200) {
      const removed = watchlist.filter((company) => company.ticker !== e);
      setWatchlist(removed);
    }
  }

  function handleOnClick(e) {
    console.log(e.target.closest("li").id.split("_")[1]);
    if (e.target.closest("li").id.split("_")[1] === "box") {
      const tickerDest = e.target.closest("li").id.split("_")[0];
      navigate("/transactions/"+tickerDest);
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-start pr-12 font-bold items-center border-solid border-sky-500 border-y-2 bg-sky-100">
        <div className="bg-sky-900 h-8 rounded-full w-8 flex justify-center items-center m-2">
          <span className={`fa fa-star text-white text-sm`}></span>
        </div>
        Watchlist
      </div>
      <div className="flex mt-3 m-2">
        <input
          className="border-2 grow rounded border-black p-2"
          type="text"
          value={searchValue}
          onChange={handleSearchValueChange}
          placeholder="type the ticker"
        ></input>
        <button
          onClick={()=> handleAddButton(searchValue)}
          className="mx-2 bg-sky-900 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded"
        >
          <span className="fa fa-plus-circle text-white mr-2"></span>Add
        </button>
        <button
          onClick={handleEditButton}
          className="mx-2 bg-amber-600 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded"
        >
          <span
            className={`fa ${
              isEditMode ? "fa-check text-green-500" : "fa-edit text-white"
            } `}
          ></span>
          {/* {isEditMode ? " OK " : " Edit "} */}
        </button>
      </div>
      <ul className="absolute">
        {filterCompanies.map((company, index) => (
          <li
            key={index}
            className={`text-left ${
              index % 2 === 0 ? " bg-sky-50 " : "bg-white"
            } hover:font-bold `}
            onClick={(e) => {
              handleAddButton(e.target.innerText);
            }}
          >
            {company.ticker + " " + company.profile.name}
          </li>
        ))}
      </ul>
      <ul className="flex flex-col">
        {watchlist.map((item, index) => (
          <li
            key={index}
            id={`${item.ticker}_box`}
            className="flex"
          >
            <BoxWatchlist
              ticker={item.ticker}
              isEditMode={isEditMode}
              handleDelete={handleDelete}
              handleOnClick={handleOnClick}

            />
          </li>
        ))}
        {/* <div className="fa fa-bar-chart" />
        <div className="fa fa-user-o" />
        <div>
          <span className="fa fa-long-arrow-up" />
          <span className="fa fa-long-arrow-down" />
        </div>
        <div className="fa fa-industry" />
        <div className="fa fa-pie-chart" />
        <div className="fa fa-usd" /> */}
        {/* {loggedUser ? <Dashboard loggedUser={loggedUser}/> : <Welcome />} */}
      </ul>
    </div>
  );
}
