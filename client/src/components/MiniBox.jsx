import { useEffect, useState } from "react";
import { getQuote } from "../controller/controller";

export default function MiniBox({ ticker }) {
  const [quote, setQuote] = useState({});
  const [color, setColor] = useState("white");
  const [arrow, setArrow] = useState("fa fa-minus");
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const res = await getQuote(ticker);
      setQuote(res.response);
      if(res.status>=300) return
      setIsLoading(false)
    }
    getData();
  }, []);

  useEffect(() => {
    if(isLoading)return
    if (quote.quote.d > 0) {
      setColor("green-500");
      setArrow("fa  fa-caret-up");
    } else {
      setColor("red-500");
      setArrow("fa  fa-caret-down");
    }
  }, [quote]);
  
  if (isLoading) return (
    <div className="bg-black">
    <span className={`ml-6  text-2xl my-2 text-${color}`}>Loading . . .</span>  
  </div>
  )

  return (
    <div className="bg-black">
      {/* {console.log('Rendered at ' + new Date(Date.now()))} */}
      <span className={`ml-6  text-xl my-2 text-${color}`}>{ticker}</span>  
      <span className={`ml-2 text-xl my-2 text-${color}`}>${Number(quote.quote.c).toLocaleString("en-CA", {minimumFractionDigits: 2, maximumFractionDigits:2})}</span>  
      <span className={`ml-2 text-xl my-2 text-${color}`}>{Number(quote.quote.dp).toLocaleString("en-CA", {minimumFractionDigits: 2, maximumFractionDigits:2})}%</span>  
      <span className={`ml-2 text-2xl text-${color} ${arrow}`}></span>  
    </div>
  );
}

// import { useEffect, useState } from "react";
// import InfiniteMarquee from "vanilla-infinite-marquee";
// import { getQuote } from "../controller/controller";

// export default function Marquee() {
//   const tickers = ["AAPL", `AAPL`];

//   const [quotes, setQuotes] = useState([]);

//   useEffect(() => {
//     tickers.map(async (ticker) => {
//       const quote = await getQuote(ticker);
//       setQuotes((quotes) => [
//         ...quotes,
//         { ticker: ticker, quote: quote.response },
//       ]);
//     });
//   }, []);

//   useEffect(() => {
//     console.log(quotes);
//   }, [quotes]);

//   return (
//     <div className="marquee">
//       {quotes.map((quote, index) => (
//         <div key={index} className="flex marquee__item w-[100vw]">
//           <div className="flex w-[100vw]">
//             <span className="text-white font-bold mx-2">{quote.ticker}</span>
//             <span className="text-white font-bold">
//               ${(quote.quote.c)}
//             </span>
//             {/* <span className="text-white font-bold">{Number(quote.quote.dp).toLocaleString("en-CA", {minimumFractionDigits: 2, maximumFractionDigits:2})}%</span>
//             <span className="text-red-500 fa fa-arrow-up"></span> */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
