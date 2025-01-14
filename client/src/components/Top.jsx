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
      label: "News",
      icon: "fa-newspaper-o",
      href: "/news",
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
      if (res.status <= 201) {
        setIsLogged(true);
        if (location.pathname === '/home'
          || location.pathname === '/'
        ) {
          navigate('/assets')

        }
      } else {
        setIsLogged(false);
        if (location.pathname !== '/login'
          && location.pathname !== '/signup'
          && location.pathname !== '/home'
        ) {
          navigate('/home')
        }

      }
    }
    getData();
  }, [location]);

  return (
    <div>
      <div className="place-items-center grid grid-cols-[20%_auto_20%] bg-sky-900 pt-4 pb-2 w-[100vw] min-h-[70px]">
        <button className="flex justify-center items-center bg-sky-50 rounded-full w-12 h-12">
          <span
            onClick={() => {
              navigate("/");
            }}
            className="text-2xl text-sky-900 fa fa-home"
          ></span>
        </button>
        <div className="flex justify-center items-center h-12 overflow-hidden">
          {/* <img src="/favico.ico" width={"45px"} className="mx-2"></img> */}
          <h1 className="font-bold text-sky-50 text-xl">Stock Simulator</h1>
        </div>
        <button className="flex justify-center items-center bg-sky-50 rounded-full w-12 h-12">
          <span
            onClick={handleClickSideBar}
            className={`text-sky-900 text-2xl fa ${showSideBar ? "fa-times" : "fa-reorder"
              } `}
          ></span>
        </button>
      </div>
      {showSideBar && (
        <div className="z-10 absolute border-sky-500 bg-sky-100 border-t-2 cursor-pointer">
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
                  className="flex justify-start items-center border-sky-500 bg-sky-100 hover:bg-sky-200 pr-12 border-b-2 border-solid hover:font-bold"
                >
                  <div className="flex justify-center items-center bg-sky-900 m-2 rounded-full w-8 h-8">
                    <span
                      className={`fa ${item.icon} text-white text-sm`}
                    ></span>
                  </div>
                  {item.label}
                </div>
              )
          )}
          {/* <div className="flex justify-start items-center border-sky-500 bg-sky-100 border-b-2 border-solid w-[50vw]">
            <div className="flex justify-center items-center bg-sky-900 m-2 rounded-full w-8 h-8">
              <span className="text-sm text-white fa fa-diamond"></span>
            </div>
            My Assets
          </div>
          <div className="flex justify-start items-center border-sky-500 bg-sky-100 border-b-2 border-solid w-[50vw]">
            <div className="flex justify-center items-center bg-sky-900 m-2 rounded-full w-8 h-8">
              <span className="text-sm text-white fa fa-star"></span>
            </div>
            Watchlist
          </div>
          <div className="flex justify-start items-center border-sky-500 bg-sky-100 border-b-2 border-solid w-[50vw]">
            <div className="flex justify-center items-center bg-sky-900 m-2 rounded-full w-8 h-8">
              <span className="text-sm text-white fa fa-exchange"></span>
            </div>
            Transactions
          </div>
          <div className="flex justify-start items-center border-sky-500 bg-sky-100 border-b-2 border-solid w-[50vw]">
            <div className="flex justify-center items-center bg-sky-900 m-2 rounded-full w-8 h-8">
              <span className="text-sm text-white fa fa-user-o"></span>
            </div>
            My Profile
          </div> */}
        </div>
      )}
    </div>
  );
}
