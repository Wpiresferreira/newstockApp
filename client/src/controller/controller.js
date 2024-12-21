//  const url = "https://server-stocks.vercel.app/"
//const url = "http://142.59.11.227:5000"
// const url = "http://localhost:5000"
const url = ""

export async function doLogin(email, password) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: myHeaders,
      credentials: "include", // Include cookies in the request
    });
    try {
      return await fetch(req).then(async (res) => {
        const response = { status: res.status, response: await res.json() }
        console.log(response)
        return response;
      });
    } catch (e) {
      console.error(e);
      return { status: 500, response: { message: "Check connection" } };
    }
  }

export async function getWatchlist() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/watchlist", {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
    });
  
    try {
      return await fetch(req).then(async (res) => {
        if (res.status === 204) {
          return {
            status: res.status,
            response: { message: "No Authenticated" },
          };
        }
        return { status: res.status, response: await res.json() };
      });
    } catch (e) {
      console.log(e);
      return { status: 500, response: { message: "Check connection" } };
    }
  }


  export async function addToWatchlist(ticker) {
    const symbol = ticker.split(" ")[0].toUpperCase()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/add_to_watchlist", {
      method: "PUT",
      body: JSON.stringify({ticker: symbol}),
      headers: myHeaders,
      credentials: "include",
    });
  
    try {
      return await fetch(req).then(async (res) => {
        if (res.status === 204) {
          return {
            status: res.status,
            response: { message: "No Authenticated" },
          };
        }
        return { status: res.status, response: await res.json() };
      });
    } catch (e) {
      console.log(e);
      return { status: 500, response: { message: "Check connection" } };
    }
  }



  export async function removeFromWatchlist(ticker) {
    const symbol = ticker.split(" ")[0].toUpperCase()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/remove_from_watchlist", {
      method: "DELETE",
      body: JSON.stringify({ticker: symbol}),
      headers: myHeaders,
      credentials: "include",
    });
  
    try {
      return await fetch(req).then(async (res) => {
        if (res.status === 204) {
          return {
            status: res.status,
            response: { message: "No Authenticated" },
          };
        }
        return { status: res.status, response: await res.json() };
      });
    } catch (e) {
      console.log(e);
      return { status: 500, response: { message: "Check connection" } };
    }
  }

  export async function getProfile(ticker) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/profile/"+ ticker, {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
    });
  
    try {
      return await fetch(req).then(async (res) => {
        if (res.status === 204) {
          return {
            status: res.status,
            response: { message: "No Authenticated" },
          };
        }
        return { status: res.status, response: await res.json() };
      });
    } catch (e) {
      console.log(e);
      return { status: 500, response: { message: "Check connection" } };
    }
  }


  export async function getQuote(ticker) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/quote/"+ ticker, {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
    });
  
    try {
      return await fetch(req).then(async (res) => {
        if (res.status === 204) {
          return {
            status: res.status,
            response: { message: "No Authenticated" },
          };
        }
        return { status: res.status, response: await res.json() };
      });
    } catch (e) {
      console.log(e);
      return { status: 500, response: { message: "Check connection" } };
    }
  }

  export async function getAllCompanies() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/api/symbols", {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
    });
  
    try {
      return await fetch(req).then(async (res) => {
        if (res.status === 204) {
          return {
            status: res.status,
            response: { message: "No Authenticated" },
          };
        }
        return { status: res.status, response: await res.json() };
      });
    } catch (e) {
      console.log(e);
      return { status: 500, response: { message: "Check connection" } };
    }
  }