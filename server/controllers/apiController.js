import "dotenv/config";
import { updateCompany } from "./dbController.js";

const apiKey = process.env.API_KEY;

export var companies = [
  { ticker: "AAPL" },
  { ticker: "NVDA" },
  { ticker: "MSFT" },
  { ticker: "GOOG" },
  { ticker: "TSLA" }
  ,
  // { ticker: "AMZN" }
  // ,
  // { ticker: "META" },
  // { ticker: "AVGO" },
  // { ticker: "BRK-B" },
  // { ticker: "WMT" }
  // ,
  // { ticker: "LLY" },
  // { ticker: "JPM" },
  // { ticker: "V" },
  // { ticker: "MA" },
  // { ticker: "ORCL" },
  // { ticker: "XOM" },
  // { ticker: "UNH" },
  // { ticker: "COST" },
  // { ticker: "NFLX" },
  // { ticker: "PG" },
  // { ticker: "HD" },
  // { ticker: "JNJ" },
  // { ticker: "BAC" },
  // { ticker: "CRM" },
  // { ticker: "ABBV" },
  // { ticker: "KO" },
  // { ticker: "TMUS" },
  // { ticker: "CVX" },
  // { ticker: "MRK" },
  // { ticker: "CSCO" },
  // { ticker: "WFC" },
  // { ticker: "NOW" },
  // { ticker: "AXP" },
  // { ticker: "MCD" },
  // { ticker: "PEP" },
  // { ticker: "IBM" },
  // { ticker: "AMD" },
  // { ticker: "MS" },
  // { ticker: "DIS" },
  // { ticker: "TMO" },
  // { ticker: "ABT" },
  // { ticker: "ADBE" },
  // { ticker: "ISRG" },
  // { ticker: "PM" },
  // { ticker: "PLTR" },
  // { ticker: "GE" },
  // { ticker: "GS" },
  // { ticker: "INTU" },
  // { ticker: "CAT" },
  // { ticker: "QCOM" },
  // { ticker: "VALE" },
   { ticker: "PBR" }
  // { ticker: "ITUB" },
  // { ticker: "BBD" },
  // { ticker: "ABEV" }
];

export async function updateData() {
  for (let i = 0; i < companies.length; i++) {
    const quote = await refreshStockQuote(companies[i].ticker);
    companies[i].quote = quote;
    // updateCompany(companies[i])
  }
  console.log("apiController.updateData() called at " + new Date(Date.now()));
}

export async function updateProfile() {
  for (let i = 0; i < companies.length; i++) {
    const profile = await getStockProfile(companies[i].ticker);
    companies[i].profile = profile;
    // updateCompany(companies[i])
  }
  console.log("apiController.updateProfile() called at " + new Date(Date.now()));
}

// setTimeout(async () => {
//     console.log(companies);

//     for (let i = 0 ; i<companies.length ; i++){
//         await updateCompany(companies[i])
//     }
// }, 2500);

export async function getStockSymbols(req, res) {
  // const apiUrl = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apiKey}`;
  // const data = await fetch(apiUrl);
  // const posts = await data.json();
  res.json(companies);
}

async function refreshStockQuote(symbol) {
  // const symbol = req.params.symbol.toUpperCase();
  // console.log(symbol)
  const apiUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
  const data = await fetch(apiUrl);
  const posts = await data.json();
  // console.log(posts)
  return posts;
}
// export async function getStockQuote(req, res){
//     const symbol = req.params.symbol.toUpperCase();
//     const apiUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
//     const data = await fetch(apiUrl);
//     const posts = await data.json();
//     res.json(posts);
// }
export async function getStockProfile(symbol) {
  //   const symbol = req.params.symbol.toUpperCase();
  const apiUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`;
  const data = await fetch(apiUrl);
  const posts = await data.json();
  return posts;
}

// export async function getStockProfile(req, res) {
//     const symbol = req.params.symbol.toUpperCase();
//     const apiUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`;
//     const data = await fetch(apiUrl);
//     const posts = await data.json();
//     res.json(posts);
//   }
