import { useEffect, useState } from "react";
import { getAssets, getCash } from "../controller/controller";
import BoxAsset from "../components/BoxAsset";
import BoxCash from "../components/BoxCash";

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [cash, setCash] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const resAssets = await getAssets();
      if (resAssets.status > 201) {
        setIsLoading(false);
        return;
      }

      const resCash = await getCash();
      
      setIsLoading(false);
      setCash(resCash.response);
      setAssets(resAssets.response);
    }
    getData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {console.log(assets)}
      {console.log(cash)}
      <div className="flex justify-start pr-12 font-bold items-center border-solid border-sky-500 border-y-2 bg-sky-100">
        <div className="bg-sky-900 h-8 rounded-full w-8 flex justify-center items-center m-2">
          <span className={`fa fa-pie-chart text-white text-sm`}></span>
        </div>
        My Assets
      </div>
      <div className="flex m-2 p-2 py-4 text-xl font-bold rounded-md justify-between bg-sky-200">
        <div>Total</div>
        <div>
          ${" "}
          {((assets
            .reduce((acum, cur) => acum + cur.qt * cur.quote.quote.c, 0))+ Number(cash.amount) )
            .toFixed(2)}
        </div>
      </div>
      <div className="flex flex-col">
        <BoxCash item = {cash}/>
        {assets.map((asset, index) => (
          <div key={index} className="flex">
            <BoxAsset item={asset} />
          </div>
        ))}
      </div>
    </div>
  );
}
