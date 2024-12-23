import { useEffect, useState } from "react";
import { getQuote } from "../controller/controller";

export default function BoxRigth({ ticker, handleDelete , isEditMode}) {
  const [companyQuote, setCompanyQuote] = useState();
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    // Retrieve user information using the cookie
    async function getData() {
      const res = await getQuote(ticker);
      if (res.status > 201) {
        setIsLoading(false);
        return;
      }
      setCompanyQuote(res.response);
      setIsLoading(false);
    }
    getData();
  }, [ticker]);


  if (isLoading) return <h1>Loading . . .</h1>;
  return (
    <>
      {companyQuote && (
        <div id = {`${ticker}_right `}className="divbox flex text-black rounded-r-md bg-sky-100 mr-2 mt-2 w-[30vw] items-center justify-end">
          <div className="flex flex-col items-end">
            <div className="text-black font-bold text-[16px]">
              {Number(companyQuote.c).toFixed(2)}
            </div>
            <div className="text-black font-bold text-[12px]">
              {companyQuote.dp > 0
                ? "+" + Number(companyQuote.dp).toFixed(2)
                : +Number(companyQuote.dp).toFixed(2)}
              %
            </div>
          </div>
          {companyQuote.dp > 0 ? (
            <div className="m-2 min-w-8 min-h-8 ">
              <span className="text-3xl fa fa-caret-up text-green-400" />
              <span
              onClick={(e)=>handleDelete(e.target.closest(".divbox").id.split("_")[0])}
              className={isEditMode? "fa fa-minus-circle text-red-600 ml-2": null}></span>
            </div>
          ) : (
            <div className="flex m-2 min-w-8 min-h-8 justify-center items-center">
              <span className="text-3xl fa fa-caret-down text-red-400" />
              <span
              onClick={(e)=>handleDelete(e.target.closest(".divbox").id.split("_")[0])}
              className={isEditMode? "fa fa-minus-circle text-red-600 ml-2": null}></span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
