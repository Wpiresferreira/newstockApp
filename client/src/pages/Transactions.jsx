import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SearchCompanies from "../components/SearchCompanies";
import Title from "../components/Title";
import { doBuyStocks, doSellStocks, getQuote } from "../controller/controller";

export default function Transaction() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState();
  const [quantity, setQuantity] = useState(1);

  const { ticker } = useParams();
  useEffect(() => {
console.log(ticker)
    if(!ticker) return
    async function getData() {
      const result = await getQuote(ticker)
      setSelectedCompany(result.response)
      setIsLoading(false)
    }
    getData()
  }, []);

  useEffect(()=>{

console.log(selectedCompany)

  },[selectedCompany])


  const navigate = useNavigate();

  async function buyStock() {
    console.log(selectedCompany.ticker);
    console.log(selectedCompany.quote.c);
    console.log(quantity);

    const result = await doBuyStocks(
      selectedCompany.ticker,
      quantity,
      selectedCompany.quote.c
    );
    if (result.status == 200) {
      alert("Transaction completed!");
      navigate("/assets");
    } else {
      alert("Transaction not completed. Check your balance!");
    }
  }
  async function sellStock() {
    console.log(selectedCompany.ticker);
    console.log(selectedCompany.quote.c);
    console.log(quantity);

    const result = await doSellStocks(
      selectedCompany.ticker,
      quantity,
      selectedCompany.quote.c
    );
    if (result.status == 200) {
      alert("Transaction completed!");
      navigate("/assets");
    } else {
      alert("Transaction not completed. Check your balance!");
    }
  }



  async function handleAddButton(text) {

    console.log(text);
    const result = await getQuote(text.split(" ")[0])
      setSelectedCompany(result.response)
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
      <Title title="Transactions" icon="fa fa-exchange" />
      <SearchCompanies
        handleAddButton={handleAddButton}
      />
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
    </div>
  );
}
