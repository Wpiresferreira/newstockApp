import { useEffect, useState } from "react";
import { getAssets, getCash, getQuote } from "../controller/controller";
import BoxAsset from "../components/BoxAsset";
import BoxCash from "../components/BoxCash";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [assetsQuotes, setAssetsQuotes] = useState([]);
  const [cash, setCash] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAssets, setIsLoadingAssets] = useState(true);
  const [allCompanies, setAllCompanies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const resAssets = await getAssets();
      const resCash = await getCash();

      setCash(resCash.response);
      if (resAssets.status > 201) {
        setAssets([]);
      } else {
        setAssets(resAssets.response);
      }
      console.log(assets);
      setIsLoadingAssets(false);
    }
    getData();
  }, []);

  useEffect(() => {
    if (isLoadingAssets) return;
    async function updateQuotes() {
      var newArray = []
      for (let i = 0; i < assets.length; i++) {
        const res = await getQuote(assets[i].ticker);
        console.log("resQuotes");
        console.log(res.response);
        if (res.status > 201) {
          return;
        } else {
          const newAssetQuote = assets[i]
          newAssetQuote.quote = res.response;
          newArray = ([...newArray, newAssetQuote]);
        }
      }
      console.log("newArray")
      console.log(newArray)
      setAssetsQuotes(newArray)

      setIsLoading(false);
    }
    updateQuotes();
  }, [isLoadingAssets]);

  console.log(assets);

  function handleOnClick(e) {
    console.log(e.target.closest("li").id.split("_")[1]);
    if (e.target.closest("li").id.split("_")[1] === "box") {
      const tickerDest = e.target.closest("li").id.split("_")[0];
      navigate("/transactions/" + tickerDest);
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar/>
      <div className="flex m-2 p-2 py-4 text-xl font-bold rounded-md justify-between bg-sky-200">
        <div>Total</div>
        <div>
          {console.log(assets)}
          {console.log("assetsQuotes")}
          {console.log(assetsQuotes)}
          {assetsQuotes &&
            (
              assetsQuotes.reduce(
                (acum, cur) => acum + cur.qt * cur.quote.quote.c,
                0
              ) + Number(cash.amount)
            ).toLocaleString("en-CA", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
        </div>
      </div>
      <div className="flex flex-col">
        <BoxCash item={cash} />
        {assetsQuotes &&
          assetsQuotes.map((asset, index) => (

            asset.qt >0 &&
            <li key={index} id={`${asset.ticker}_box`} className="flex">
              <BoxAsset item={asset} handleOnClick={handleOnClick} />
            </li>
          ))}
      </div>
    </div>
  );
}
