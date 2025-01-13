import { useEffect, useState } from "react";

export default function Alert({ typeAlert, messageAlert, showAlert, setShowAlert }) {
  const [displayAlert, setDisplaylert] = useState(false);
  const [animateValue, setAnimateValue] = useState();
  const [idTimeout, setIdTimeout] = useState();
  const [style, setStyle] = useState(
    {iconL: " fa fa-exclamation-circle text-xl ", 
    color: " text-red-700 ",
    bg: "bg-red-200"
   })

  useEffect(() => {
    if (showAlert) {
      setDisplaylert(true);
      setAnimateValue("  opacity-100 animate-[fadeIn_1s_ease-in-out]  ");
      setIdTimeout(
        setTimeout(() => {
          setShowAlert(false);
        }, 4000)
      );
    } else {
      setAnimateValue(" animate-[fadeOut_1s_ease-in-out] opacity-0 ");
      setTimeout(() => {
        setDisplaylert(false);
      }, 1000);
    }

    if(typeAlert=="alert"){
      setStyle({iconL: " fa fa-exclamation-circle text-xl ", 
        color: " text-red-500 ",
        bg: "bg-red-200"
       })
    }
    else{
      setStyle({iconL: " fa fa-check-circle-o text-xl ", 
        color: " text-green-500 ",
        bg: "bg-green-200"
       })
    }
  }, [showAlert, typeAlert, messageAlert]);

  function handleClose() {
    setShowAlert(false);
    clearTimeout(idTimeout);
  }

  return (
    displayAlert && (
      <div
        className={`fixed mt-[75vh] grid grid-cols-[50px_1fr_50px] place-items-center z-20  max-w-[400px] ${style.bg}
    rounded-lg
    mx-auto py-[10px]
    inset-x-0
    text-center
    ${animateValue}`}
      >
        <div className={` ${style.iconL} ${style.color}`}></div>
        <div className={` ${style.color}`}>{messageAlert}</div>
        <button className="bg-transparent " onClick={handleClose}>
          <span className={`fa fa-times-circle ${style.color}`} />
        </button>
      </div>
    )
  );
}
