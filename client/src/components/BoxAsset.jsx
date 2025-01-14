import { useEffect, useState } from "react";
import { getQuote } from "../controller/controller";

export default function BoxAsset({ item, handleOnClick }) {
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    if (item) setIsLoading(false);
  }, [item]);

  if (isLoading) return <h1>Loading . . .</h1>;
  return (
    <>
      <div className="grid grid-cols-[55px_120px_55px_30px_100px] rounded-md  bg-sky-100 mx-2 mt-2 w-[98vw] max-w-[430px]">
        <div className="m-3 rounded-full border-2 border-white overflow-hidden max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px]">
          <img
            src={item.quote.profile.logo}
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
          <div className="text-left text-black font-bold text-[16px]">
            {item.ticker}
          </div>
          <div className=" overflow-hidden text-black text-left text-nowrap text-[12px]">
            {item.quote.profile.name}
          </div>
        </div>
        <div className="flex flex-col justify-evenly items-end">
          <div className="text-black  text-[16px]">
            {Number(item.quote.quote.c).toLocaleString("en-CA", {minimumFractionDigits: 2, maximumFractionDigits:2})}
          </div>
          <div className="text-black  text-[12px]">
            {item.quote.quote.dp > 0
              ? "+" + Number(item.quote.quote.dp).toLocaleString("en-CA", {minimumFractionDigits: 2, maximumFractionDigits:2})
              : +Number(item.quote.quote.dp).toLocaleString("en-CA", {minimumFractionDigits: 2, maximumFractionDigits:2})}
            %
          </div>
        </div>
        {item.quote.quote.dp > 0 ? (
          <div className="flex min-w-8 min-h-8 justify-center items-center">
            <span className="text-3xl fa fa-caret-up text-green-400" />
          </div>
        ) : (
          <div className="flex min-w-8 min-h-8 justify-center items-center">
            <span className="text-3xl fa fa-caret-down text-red-400" />
          </div>
        )}
        <div className="flex flex-col justify-evenly items-end w-[85px] mr-2">
          <div className="font-bold">
            ${(item.qt * item.quote.quote.c).toLocaleString("en-CA", {minimumFractionDigits: 2, maximumFractionDigits:2})}
          </div>
          <div className="font-bold">Qt: {item.qt}</div>
        </div>
      </div>
    </>
  );
}
