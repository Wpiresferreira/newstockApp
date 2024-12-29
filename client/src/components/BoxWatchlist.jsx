import { useEffect, useState } from "react";
import { getQuote } from "../controller/controller";

export default function BoxWatchlist({ ticker, handleDelete, handleOnClick, isEditMode}) {
  const [company, setCompany] = useState();
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    // Retrieve quote
    async function getData() {
      const res = await getQuote(ticker);
      console.log(res);
      if (res.status > 201) {
        setIsLoading(false);
        return;
      }
      setCompany(res.response);
      setIsLoading(false);
    }
    getData();
  }, [ticker]);

  if (isLoading) return <h1>Loading . . .</h1>;
  return (
    <>
      {company && (
        <>
          <div className="flex rounded-l-md  bg-sky-100 ml-2 mt-2 w-[67vw]">
            <div className="cursor-pointer m-3 rounded-full border-2 border-white overflow-hidden max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px]">
              <img
                src={company.profile.logo}
                width={60}
                height={60}
                priority={"true"}
                alt="Company logo"
                onClick={handleOnClick}
                onError={() => {
                  this.onError = null;
                  this.src = "https://placehold.co/400x300";
                }}
              />
            </div>
            <div className="flex flex-col justify-evenly">
              <div className="font-bold  text-left text-black text-[16px]">
                {ticker}{" "}
              </div>
              <div className="text-black text-left text-nowrap text-[12px]">
                {company.profile.name}
              </div>
            </div>
          </div>
          <div
            id={`${ticker}_right `}
            className="divbox flex text-black rounded-r-md bg-sky-100 mr-2 mt-2 w-[30vw] items-center justify-end"
          >
            <div className="flex flex-col items-end">
              <div className="text-black font-bold text-[16px]">
                {Number(company.quote.c).toLocaleString("en-CA", {minimumFractionDigits: 2, maximumFractionDigits:2})}
              </div>
              <div className="text-black font-bold text-[12px]">
                {company.quote.dp > 0
                  ? "+" + Number(company.quote.dp).toLocaleString("en-CA", {minimumFractionDigits: 2, maximumFractionDigits:2})
                  : +Number(company.quote.dp).toLocaleString("en-CA", {minimumFractionDigits: 2, maximumFractionDigits:2})}
                %
              </div>
            </div>
            {company.quote.dp > 0 ? (
              <div className="m-2 min-w-8 min-h-8 ">
                <span className="text-3xl fa fa-caret-up text-green-400" />
                <span
                  onClick={(e) =>
                    handleDelete(e.target.closest(".divbox").id.split("_")[0])
                  }
                  className={
                    isEditMode ? " cursor-pointer fa fa-minus-circle text-red-600 ml-2" : null
                  }
                ></span>
              </div>
            ) : (
              <div className="flex m-2 min-w-8 min-h-8 justify-center items-center">
                <span className="text-3xl fa fa-caret-down text-red-400" />
                <span
                  onClick={(e) =>
                    handleDelete(e.target.closest(".divbox").id.split("_")[0])
                  }
                  className={
                    isEditMode ? " cursor-pointer fa fa-minus-circle text-red-600 ml-2" : null
                  }
                ></span>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
