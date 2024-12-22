import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { checkIsLogged } from "../controller/controller";

export default function Top() {
  const navigate = useNavigate();
  const location = useLocation()
  const [showSideBar, setShowSideBar] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  async function handleClickSideBar() {
    setShowSideBar(!showSideBar);
    // if(showSideBar){
    //   const res = await checkIsLogged();
    //       console.log(res.status)
    //       if (res.status >=300 ) {
    //         setIsLogged(false);
    //         // setIsLoading(false);
    //         return;
    //       }
    //       // setIsLoading(false);
    //       setIsLogged(true);
    //     }
    }

  const itemsMenu = [
    { label: "Login", icon: "fa-user-circle-o", href: "/login", logged: false },
    { label: "Signup", icon: "fa-user-plus", href: "/signup", logged: false },
    { label: "My Assets", icon: "fa-diamond", href: "/assets", logged: true },
    { label: "Watchlist", icon: "fa-star", href: "/watchlist", logged: true },
    {
      label: "Transactions",
      icon: "fa-exchange",
      href: "/transactions",
      logged: true,
    },
    {
      label: "My Profile",
      icon: "fa-exchange",
      href: "/profile",
      logged: true,
    },
    {
      label: "Logout",
      icon: "fa-power-off",
      href: "/logout",
      logged: true,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-[20vw_60vw_20vw] bg-sky-50 place-items-center w-[100vw] max-w-[430px] min-h-[70px] mt-4">
        <div className="bg-sky-900 h-12 rounded-full w-12 flex justify-center items-center">
          <span
            onClick={() => {
              navigate("/");
            }}
            className="fa fa-bar-chart text-white"
          ></span>
        </div>
        <div className="h-12 flex justify-center items-center">
          <h1 className="text-xl font-bold">Stock Simulator</h1>
        </div>
        <div className="bg-sky-900 h-12 rounded-full w-12 flex justify-center items-center">
          <span
            onClick={handleClickSideBar}
            className={`text-white fa ${
              showSideBar ? "fa-times" : "fa-reorder"
            } `}
          ></span>
        </div>
      </div>
      {showSideBar && (
        <div className="z-10 absolute border-sky-500 border-t-2 mt-2 bg-sky-100">
          {itemsMenu.map(
            (item, index) =>
              ((
                // isLogged && 
                item.logged) || (!isLogged && !item.logged)) && (
                <div
                key={index}
                  onClick={() => {
                    setShowSideBar(!showSideBar);
                    navigate(item.href);
                  }}
                  className="flex justify-start items-center w-[50vw] border-solid border-sky-500 border-b-2 bg-sky-100"
                >
                  <div className="bg-sky-900 h-8 rounded-full w-8 flex justify-center items-center m-2">
                    <span
                      className={`fa ${item.icon} text-white text-sm`}
                    ></span>
                  </div>
                  {item.label}
                </div>
              )
          )}
          {/* <div className="flex justify-start items-center w-[50vw] border-solid border-sky-500 border-b-2 bg-sky-100">
            <div className="bg-sky-900 h-8 rounded-full w-8 flex justify-center items-center m-2">
              <span className="fa fa-diamond text-white text-sm"></span>
            </div>
            My Assets
          </div>
          <div className="flex justify-start items-center w-[50vw] border-solid border-sky-500 border-b-2 bg-sky-100">
            <div className="bg-sky-900 h-8 rounded-full w-8 flex justify-center items-center m-2">
              <span className="fa fa-star text-white text-sm"></span>
            </div>
            Watchlist
          </div>
          <div className="flex justify-start items-center w-[50vw] border-solid border-sky-500 border-b-2 bg-sky-100">
            <div className="bg-sky-900 h-8 rounded-full w-8 flex justify-center items-center m-2">
              <span className="fa fa-exchange text-white text-sm"></span>
            </div>
            Transactions
          </div>
          <div className="flex justify-start items-center w-[50vw] border-solid border-sky-500 border-b-2 bg-sky-100">
            <div className="bg-sky-900 h-8 rounded-full w-8 flex justify-center items-center m-2">
              <span className="fa fa-user-o text-white text-sm"></span>
            </div>
            My Profile
          </div> */}
        </div>
      )}
    </div>
  );
}
