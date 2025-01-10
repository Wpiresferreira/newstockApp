import { useEffect, useState } from "react";

export default function Alert({ type, message }) {
  const [typeAlert, setTypeAlert] = useState(type);
  const [show, setShow] = useState(false);
  const [animateValue, setAnimateValue] = useState(
    " opacity-100 animate-[fadeIn_1s_ease-in-out] "
  );

  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 5000);
  }, []);

  function handleClose() {
    setAnimateValue(" animate-[fadeOut_1s_ease-in-out] opacity-0 ");
    setTimeout(() => {
        
    }, 5000);
  }

//   if(!show)

  return (
    <div
      className={`mt-[40vh] grid grid-cols-[50px_1fr_50px] absolute z-20 min-w-[400px]  max-w-[400px] bg-red-200
    rounded-lg
    mx-auto
    inset-x-0
    text-center
    ${animateValue}`}
    >
      <div>icon</div>
      <div>Message{message}</div>
      <button className="bg-transparent " onClick={handleClose}>
        <span className="fa fa-times-circle text-red-500" />
      </button>
    </div>
  );
}
