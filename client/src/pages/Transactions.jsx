import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchCompanies from "../components/SearchCompanies";
import Title from "../components/Title";
import { doBuyStocks, doSellStocks } from "../controller/controller";

export default function Transaction({ quote, doSetQuote }) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(quote);
  const[quantity, setQuantity] = useState(1)
  console.log(quote);

  const navigate = useNavigate()

  async function buyStock(){
    console.log(selectedCompany.ticker)
    console.log(selectedCompany.quote.c)
    console.log(quantity)

    const result = await doBuyStocks(selectedCompany.ticker, quantity, selectedCompany.quote.c)
    if(result.status== 200){
      alert('Transaction completed!')
      navigate('/assets')
    }else{
      alert('Transaction not completed. Check your balance!')
    }
  }
  async function sellStock(){
    console.log(selectedCompany.ticker)
    console.log(selectedCompany.quote.c)
    console.log(quantity)

    const result = await doSellStocks(selectedCompany.ticker, quantity, selectedCompany.quote.c)
    if(result.status== 200){
      alert('Transaction completed!')
      navigate('/assets')
    }else{
      alert('Transaction not completed. Check your balance!')
    }
  }
  return (
    <div>
      <Title title="Transactions" icon="fa fa-exchange"/>
      <SearchCompanies doSetQuote={doSetQuote} />
      <div className="flex items-center justify-center">
        <div className="rounded-lg overflow-hidden h-32 w-32 m-4 ">
          <img src={selectedCompany ? selectedCompany.profile.logo : null} />
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
                ? selectedCompany.quote.dp.toLocaleString(undefined, {
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
          <div className=" justify-self-start self-center  p-2">Prev. Close</div>
          <div className="justify-self-end self-center  p-2">
            $
            {selectedCompany.quote.pc.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="justify-self-start self-center p-2">Open</div>
          <div className="justify-self-end self-center p-2">
            $
            {selectedCompany.quote.o.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="justify-self-start self-center p-2">High</div>
          <div className="justify-self-end self-center p-2">
            $
            {selectedCompany.quote.h.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="justify-self-start self-center p-2">Low</div>
          <div className="justify-self-end self-center p-2 ">
            $
            {selectedCompany.quote.l.toLocaleString(undefined, {
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
          onChange={(e)=>setQuantity(e.target.value)}
        ></input>
      </div>
      <div className="flex">
        <button
        onClick={buyStock}
        className="grow bg-green-500 text-white m-2 border-2 border-green-500 hover:bg-white hover:text-green-500">Buy</button>
        <button 
        onClick={sellStock}
        className="grow bg-red-500 text-white m-2 border-2 border-red-500 hover:bg-white hover:text-red-500">Sell</button>
      </div>
    </div>
  );
}
