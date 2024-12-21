import { useState } from "react";

export default function Top() {
  const [showSideBar, setShowSideBar] = useState(false);

  function handleClickSideBar() {
    setShowSideBar(!showSideBar);
  }

  return (
    <div>
      <div className="flex justify-around">
        <span className="fa fa-bar-chart"></span>
        <h1 className="text-2xl">Stock</h1>
        <span
        onClick={handleClickSideBar}
        className="fa fa-reorder"></span>
      </div>
      {showSideBar && (
        <div>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
        </div>
      )}
    </div>
  );
}
