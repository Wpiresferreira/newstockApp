import { useEffect, useState } from "react";
import { getQuote } from "../controller/controller";

export default function BoxAsset({ item }) {
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    console.log(item);
    if (item) setIsLoading(false);
  }, [item]);

  if (isLoading) return <h1>Loading . . .</h1>;
  return (
    <>
      <div className="flex rounded-l-md  bg-sky-100 ml-2 mt-2 w-[67vw]">
        <div className="m-3 rounded-full border-2 border-white overflow-hidden max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px]">
          <img
            src={item.quote.profile.logo}
            width={60}
            height={60}
            priority={"true"}
            alt="Company logo"
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
          <div className="text-black text-left text-nowrap text-[12px]">
            {item.quote.profile.name}
          </div>
        </div>
      </div>
      <div
        id={`${item.ticker}_right `}
        className="divbox flex text-black rounded-r-md bg-sky-100 mr-2 mt-2 w-[30vw] items-center justify-end"
      >
        <div className="flex flex-col items-end">
          <div className="text-black  text-[16px]">
            {Number(item.quote.quote.c).toFixed(2)}
          </div>
          <div className="text-black  text-[12px]">
            {item.quote.quote.dp > 0
              ? "+" + Number(item.quote.quote.dp).toFixed(2)
              : +Number(item.quote.quote.dp).toFixed(2)}
            %
          </div>
        </div>
        {item.quote.quote.dp > 0 ? (
          <div className="m-2 min-w-8 min-h-8 ">
            <span className="text-3xl fa fa-caret-up text-green-400" />
          </div>
        ) : (
          <div className="flex m-2 min-w-8 min-h-8 justify-center items-center">
            <span className="text-3xl fa fa-caret-down text-red-400" />
          </div>
        )}
        <div className="flex flex-col items-end">
          <div className="font-bold">
            ${(item.qt * item.quote.quote.c).toFixed(2)}
          </div>
          <div className="font-bold">Qt: {item.qt}</div>
        </div>
      </div>
    </>
  );
}
