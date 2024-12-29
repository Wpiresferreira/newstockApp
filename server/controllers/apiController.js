import "dotenv/config";

const apiKey = process.env.API_KEY;
const quotesApiKey = process.env.QUOTES_API_KEY;


export async function getStockSymbols(req, res) {

  try{


    const apiUrl = `http://142.59.11.227:5123/symbols/?token=${quotesApiKey}`;
    const data = await fetch(apiUrl);
    const posts = await data.json();
    res.status(200).json(posts);
  }catch(e){
    console.log(e)
    res.status(500).json({message: "Error getting symbols."})
  }
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
