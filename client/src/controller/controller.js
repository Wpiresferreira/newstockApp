//  const url = "https://server-stocks.vercel.app/"
//const url = "http://142.59.11.227:5000"
const url = ""
//const url = "http://localhost:5000"

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

  export async function doSignup(email, name, password, confirmPassword) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/api/signup", {
      method: "POST",
      body: JSON.stringify({ email: email, name: name, password: password, confirm_password : confirmPassword }),
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


// export async function checkIsLogged() {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Accept", "*/*");
  
//     const req = new Request(url + "/api/islogged", {
//       method: "GET",
//       headers: myHeaders,
//       credentials: "include", // Include cookies in the request
//     });
//     try {
//       return await fetch(req).then(async (res) => {
//         const response = { status: res.status, response: await res.json() }
//         return response;
//       });
//     } catch (e) {
//       return { status: 500, response: { message: "Check connection" } };
//     }
//   }

export async function getWatchlist() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/api/watchlist", {
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
  
    const req = new Request(url + "/api/add_to_watchlist", {
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
  
    const req = new Request(url + "/api/remove_from_watchlist", {
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
  
    const req = new Request(url + "/api/profile/"+ ticker, {
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
  
    const req = new Request(url + "/api/quote/"+ ticker, {
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

  export async function doLogout() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
   
    const req = new Request(url + "/api/logout", {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
    });
  
    // Send logout request
    try {
      const response = await fetch(url + "/logout", {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });
  
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  
    const result = await fetch(req).then(async (res) => {
      return { status: res.status, response: await res.json() };
    });
    return await result;
  }