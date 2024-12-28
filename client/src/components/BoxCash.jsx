
export default function BoxCash({ item }) {

  return (
    <div className="flex">
      <div className="flex rounded-l-md  bg-sky-100 ml-2 mt-2 w-[67vw]">
        <div className="m-3 bg-green-500 rounded-full border-2 border-white overflow-hidden max-h-[40px] max-w-[40px] min-h-[40px] min-w-[40px]">
          
          <span className=" text-2xl fa fa-usd"></span>

        </div>
        <div className="flex flex-col justify-evenly">
          <div className="text-left text-black font-bold text-[16px]">
            Cash
          </div>
            
        </div>
      </div>
      <div
        id={`${item.ticker}_right `}
        className="divbox flex text-black rounded-r-md bg-sky-100 mr-2 mt-2 w-[30vw] items-center justify-end"
      >
        
        <div className="flex flex-col items-end">
          <div className="font-bold">
            ${(Number(item.amount)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}
          </div>
        </div>
      </div>
    </div>
  );
}
