import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkIsLogged } from "../controller/controller";
// import { checkIsLogged } from "../controller/controller";

export default function Top() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSideBar, setShowSideBar] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  function handleClickSideBar() {
    setShowSideBar(!showSideBar);
  }

  const itemsMenu = [
    { label: "Login", icon: "fa-user-circle-o", href: "/login", logged: false },
    { label: "Signup", icon: "fa-user-plus", href: "/signup", logged: false },
    { label: "My Assets", icon: "fa-pie-chart", href: "/assets", logged: true },
    { label: "Watchlist", icon: "fa-star", href: "/watchlist", logged: true },
    {
      label: "Transactions",
      icon: "fa-exchange",
      href: "/transactions",
      logged: true,
    },
    {
      label: "My Profile",
      icon: "fa-user-o",
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

  useEffect(() => {
    async function getData() {
      const res = await checkIsLogged();
      console.log(res.status);
      console.log(res.response);
      if (res.status <= 201) {
        setIsLogged(true);
      }else{
        setIsLogged(false);

      }
    }
    getData();
  }, [location]);

  return (
    <div>
      <div className="grid grid-cols-[20%_auto_20%] bg-sky-900 place-items-center w-[100vw] max-w-[430px] min-h-[70px] pt-4 pb-2">
        <button className="bg-sky-50 h-12 rounded-full w-12 flex justify-center items-center">
          <span
            onClick={() => {
              navigate("/");
            }}
            className="fa fa-home text-2xl text-sky-900"
          ></span>
        </button>
        <div className="h-12 overflow-hidden flex justify-center items-center">
          {/* <img src="/favico.ico" width={"45px"} className="mx-2"></img> */}
          <h1 className="text-xl font-bold text-sky-50">Stock Simulator</h1>
        </div>
        <button className="bg-sky-50 h-12 rounded-full w-12 flex justify-center items-center">
          <span
            onClick={handleClickSideBar}
            className={`text-sky-900 text-2xl fa ${
              showSideBar ? "fa-times" : "fa-reorder"
            } `}
          ></span>
        </button>
      </div>
      {showSideBar && (
        <div className=" cursor-pointer z-10 absolute border-sky-500 border-t-2 bg-sky-100">
          {itemsMenu.map(
            (item, index) =>
              ((isLogged &&
              item.logged) || (!isLogged && !item.logged)) && (
                <div
                  key={index}
                  onClick={() => {
                    setShowSideBar(!showSideBar);
                    navigate(item.href);
                  }}
                  className="flex justify-start pr-12 hover:font-bold hover:bg-sky-200 items-center border-solid border-sky-500 border-b-2 bg-sky-100"
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
