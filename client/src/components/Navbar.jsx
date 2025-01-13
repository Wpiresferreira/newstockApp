import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate()

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

  return (
    <div className="flex pr-2 justify-between	font-bold border-solid border-sky-500 border-y-2 bg-sky-100">
      {itemsMenu.map((item) =>
        location.pathname.startsWith(item.href) ? (
          <div key={item.label} className="flex items-center">
            <div className="inline bg-sky-900 h-8 rounded-full w-8 flex justify-center items-center m-2">
              <div className={`fa ${item.icon} text-white text-sm`}></div>
            </div>
            <div className="text-nowrap">{item.label}</div>
          </div>
        ) : null
      )}
      <div className="flex">
        {itemsMenu.map((item) =>
          !location.pathname.startsWith(item.href) && item.logged ? (
            <div
              key={item.label}
              title={item.label}
              className="flex items-center hover:cursor-pointer"
              onClick={()=> navigate(item.href)}
            >
              <div className="inline bg-white h-8 rounded-full border-solid border-[1px] border-sky-700 w-8 flex justify-center items-center m-2">
                <div className={`fa ${item.icon} text-sky-900 text-sm`}></div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
