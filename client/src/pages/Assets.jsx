import { useEffect, useState } from "react";
import {getAssets} from "../controller/controller";
import BoxLeft from "../components/BoxLeft";
import BoxRigth from "../components/BoxRigth";

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Retrieve user information using the cookie
    async function getData() {
      const res = await getAssets();
      if (res.status > 201) {
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setAssets(res.response);
    }
    getData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-start pr-12 font-bold items-center border-solid border-sky-500 border-y-2 bg-sky-100">
        <div className="bg-sky-900 h-8 rounded-full w-8 flex justify-center items-center m-2">
          <span className={`fa fa-pie-chart text-white text-sm`}></span>
        </div>
        My Assets
      </div>
      <div className="flex flex-col">
        {assets.map((item, index) => (
          <div key={index} className="flex">
            <BoxLeft ticker={item.ticker} />
            <BoxRigth
              ticker={item.ticker}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
