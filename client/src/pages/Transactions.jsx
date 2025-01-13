import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import SearchCompanies from "../components/SearchCompanies";
import { doBuyStocks, doSellStocks, getQuote } from "../controller/controller";
import Navbar from "../components/Navbar";

export default function Transaction() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState();
  const [quantity, setQuantity] = useState(1);
  const { setShowAlert, setTypeAlert, setMessageAlert } = useOutletContext();

  const { ticker } = useParams();
  useEffect(() => {
    if (!ticker) return;
    async function getData() {
      const result = await getQuote(ticker);
      setSelectedCompany(result.response);
      setIsLoading(false);
    }
    getData();
  }, []);

  const navigate = useNavigate();

  async function buyStock() {

    const result = await doBuyStocks(
      selectedCompany.ticker,
      quantity,
      selectedCompany.quote.c
    );


    if (result.status == 200) {
      setTypeAlert("sucess");
    } else {
      setTypeAlert("alert");
    }
    setShowAlert(true);
    setMessageAlert(result.response.message);
    
  }
  async function sellStock() {
    const result = await doSellStocks(
      selectedCompany.ticker,
      quantity,
      selectedCompany.quote.c
    );
    if (result.status == 200) {
      setTypeAlert("sucess");
    } else {
      setTypeAlert("alert");
    }
    setShowAlert(true);
    setMessageAlert(result.response.message);
  }

  async function handleAddButton(text) {
    const result = await getQuote(text.split(" ")[0]);
    setSelectedCompany(result.response);
    //Check if symbol is not null or ""
    // if (searchValue == null || searchValue == "") {
    //   return;
    // }
    // console.log(text);
    // var sValue;
    // if (text) {
    //   sValue = text;
    // } else {
    //   sValue = searchValue;
    // }
    // console.log(sValue);

    // //Check if symbol is valid
    // const checkValid = allCompanies.filter(
    //   (company) => company.ticker === sValue.split(" ")[0].toUpperCase()
    // );
    // if (!checkValid[0]) {
    //   alert("Ticker Invalid");
    //   return;
    // }
    // //Check if symbol is already on Watchlist
    // const checkAlreadyInWatchlist = watchlist.filter(
    //   (company) => company.ticker === sValue.split(" ")[0].toUpperCase()
    // );
    // if (checkAlreadyInWatchlist[0]) {
    //   alert("Ticker Is Already Listed");
    //   setSearchValue("");
    //   return;
    // }

    // const result = await addToWatchlist(sValue.split(" ")[0]);

    // if (result.status === 200) {
    //   setWatchlist([
    //     ...watchlist,
    //     { ticker: sValue.split(" ")[0].toUpperCase() },
    //   ]);
    //   setSearchValue("");
    // }
  }

  // if (isLoading) return <h1>Loading . . . </h1>;
  return (
    <div>
      <Navbar />
      <SearchCompanies handleAddButton={handleAddButton} />
      {selectedCompany && (
        <>
          <div className="select-none flex items-center justify-center">
            <div className="rounded-lg overflow-hidden h-32 w-32 m-4 ">
              <img
                src={selectedCompany ? selectedCompany.profile.logo : null}
              />
            </div>
            <div
              className={`${
                selectedCompany && selectedCompany.quote.d > 0
                  ? "bg-green-500"
                  : selectedCompany && selectedCompany.quote.d < 0
                  ? "bg-red-500"
                  : " bg-slate-500 "
              }  rounded-lg flex items-center text-white font-bold`}
            >
              <div className="flex flex-col items-end">
                <div className="pl-3">
                  {selectedCompany ? "$" + selectedCompany.quote.c : "-"}
                </div>
                <div>
                  {selectedCompany
                    ? selectedCompany.quote.dp.toLocaleString("en-CA", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) + "%"
                    : "-"}
                </div>
              </div>
              <div className="fa fa-caret-down text-white pl-4 pr-2 text-2xl"></div>
            </div>
          </div>
          {selectedCompany && (
            <div className=" text-sm font-bold grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[40px_40px] gap-2 content-center justify-items-center bg-sky-200 m-2 rounded-lg">
              <div className=" tracking-tight justify-self-start self-center  p-2">
                Prev close
              </div>
              <div className="justify-self-end self-center  p-2">
                $
                {selectedCompany.quote.pc.toLocaleString("en-CA", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="justify-self-start self-center p-2">Open</div>
              <div className="justify-self-end self-center p-2">
                $
                {selectedCompany.quote.o.toLocaleString("en-CA", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="justify-self-start self-center p-2">High</div>
              <div className="justify-self-end self-center p-2">
                $
                {selectedCompany.quote.h.toLocaleString("en-CA", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="justify-self-start self-center p-2">Low</div>
              <div className="justify-self-end self-center p-2 ">
                $
                {selectedCompany.quote.l.toLocaleString("en-CA", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          )}
          <div className=" flex justify-center items-center m-2">
            <div className="m-2">Quantity</div>
            <input
              className="border-2 w-16 rounded border-black p-2"
              type="number"
              min="0"
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></input>
          </div>
          <div className="flex">
            <button
              onClick={buyStock}
              className="grow bg-green-500 text-white m-2 border-2 border-green-500 hover:bg-white hover:text-green-500"
            >
              Buy
            </button>
            <button
              onClick={sellStock}
              className="grow bg-red-500 text-white m-2 border-2 border-red-500 hover:bg-white hover:text-red-500"
            >
              Sell
            </button>
          </div>
        </>
      )}
            {!selectedCompany && (
        <ul className="text-left m-8 list-disc text-sky-900">
          <li>Select one company to see their details by typing the ticker on the search bar.
          </li>
          <li>
            You have access to 50 biggest US companies + 5 biggest Brazilian
            ADRs
          </li>
        </ul>
      )}
    </div>
  );
}
