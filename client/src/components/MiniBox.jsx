import { useEffect, useState } from "react";
import { getQuote } from "../controller/controller";

export default function MiniBox({ ticker }) {
  const [quote, setQuote] = useState({});
  const [color, setColor] = useState("white");
  const [arrow, setArrow] = useState("fa fa-minus");

  useEffect(() => {
    async function getData() {
      const res = await getQuote(ticker);
      setQuote(res.response);
    }
    getData();
  }, []);

  useEffect(() => {
    console.log(quote);
    if (quote.d > 0) {
      setColor("green-500");
      setArrow("fa  fa-caret-up");
    } else {
      setColor("red-500");
      setArrow("fa  fa-caret-down");
    }
  }, [quote]);

  return (
    <div className="bg-black">
      <span className={`ml-6  text-xl my-2 text-${color}`}>{ticker}</span>  
      <span className={`ml-2 text-xl my-2 text-${color}`}>${Number(quote.c).toFixed(2)}</span>  
      <span className={`ml-2 text-xl my-2 text-${color}`}>{Number(quote.dp).toFixed(2)}%</span>  
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
//             {/* <span className="text-white font-bold">{Number(quote.quote.dp).toFixed(2)}%</span>
//             <span className="text-red-500 fa fa-arrow-up"></span> */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
