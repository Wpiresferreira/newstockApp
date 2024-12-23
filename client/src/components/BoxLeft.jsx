import { useEffect, useState } from "react";
import { getProfile } from "../controller/controller";

export default function BoxLeft({ ticker }) {
  const [companyProfile, setCompanyProfile] = useState();
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    // Retrieve user information using the cookie
    async function getData() {
      const res = await getProfile(ticker);
      console.log(res)
      if (res.status > 201) {
        setIsLoading(false);
        return;
      }
      setCompanyProfile(res.response);
      setIsLoading(false);
    }
    getData();
  }, [ticker]);

  if (isLoading) return <h1>Loading . . .</h1>
  return (
    <>
     {companyProfile &&
     <div className="flex rounded-l-md  bg-sky-100 ml-2 mt-2 w-[67vw]">
        <div className="m-3 rounded-full border-2 border-white overflow-hidden max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px]">
          <img
            src={companyProfile.logo}
            width={60}
            height={60}
            priority={"true"}
            alt="Company logo"
            onerror={()=>{
              this.onerror=null;
              this.src='https://placehold.co/400x300'}
            }
          />
        </div>
        <div className="flex flex-col justify-evenly">
          <div className="font-bold  text-left text-black text-[16px]">{ticker} </div>
          <div className="text-black text-left text-nowrap text-[12px]">
            {companyProfile.name}
          </div>
        </div>
      </div>
    }
    </>
  );
}
