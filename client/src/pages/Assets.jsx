import { useEffect, useState } from "react";
import { getAllCompanies, getAssets, getCash } from "../controller/controller";
import BoxAsset from "../components/BoxAsset";
import BoxCash from "../components/BoxCash";
import { useNavigate } from "react-router-dom";

export default function Assets({doSetQuote}) {
  const [assets, setAssets] = useState([]);
  const [cash, setCash] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allCompanies, setAllCompanies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const resAssets = await getAssets();
      const resCash = await getCash();

      setCash(resCash.response);
      console.log(assets);
      if (resAssets.status > 201) {
        setAssets([]);
      } else {
        setAssets(resAssets.response);
      }
      setIsLoading(false);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const res = await getAllCompanies();
      if (res.status > 201) {
        // setIsLoadingAllCompanies(false);
        return;
      }
      // setIsLoadingAllCompanies(false);
      setAllCompanies(res.response);
    }
    getData();
  }, []);

  function handleOnClick(e) {
    console.log(e.target.closest("li").id.split("_")[1]);
    if (e.target.closest("li").id.split("_")[1] === "box") {
      const tickerDest = e.target.closest("li").id.split("_")[0];
      navigate("/transactions/"+tickerDest );
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-start pr-12 font-bold items-center border-solid border-sky-500 border-y-2 bg-sky-100">
        <div className="bg-sky-900 h-8 rounded-full w-8 flex justify-center items-center m-2">
          <span className={`fa fa-pie-chart text-white text-sm`}></span>
        </div>
        My Assets
      </div>
      <div className="flex m-2 p-2 py-4 text-xl font-bold rounded-md justify-between bg-sky-200">
        <div>Total</div>
        <div>
          {console.log(assets)}
          {assets &&
            (
              assets.reduce(
                (acum, cur) => acum + cur.qt * cur.quote.quote.c,
                0
              ) + Number(cash.amount)
            ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
        </div>
      </div>
      <div className="flex flex-col">
        <BoxCash item={cash} />
        {assets &&
          assets.map((asset, index) => (
            <li key={index} id={`${asset.ticker}_box`} className="flex">
              <BoxAsset item={asset} handleOnClick={handleOnClick} />
            </li>
          ))}
      </div>
    </div>
  );
}
