
var url
if(import.meta.env.VITE_ENVIRONMENT=="development"){
  url = "http://localhost:5000"
}else{
  url = ""
}

export async function doLogin(email, password) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: myHeaders
    });
    try {
      return await fetch(req).then(async (res) => {
        const response = { status: res.status, response: await res.json() }
        console.log("controller response")
        console.log(response)
        return response;
      });
    } catch (e) {
      console.error(e);
      return { status: 500, response: { message: "Check connection" } };
    }
  }


  export async function doGuestLogin() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/api/login-guest", {
      method: "GET",
      headers: myHeaders
    });
    try {
      return await fetch(req).then(async (res) => {
        const response = { status: res.status, response: await res.json() }
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
      headers: myHeaders });
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


  export async function updateUser(data) {
    const {email, name, password, confirmPassword} = data
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/api/update_user", {
      method: "POST",
      body: JSON.stringify({ token : localStorage.getItem("token"), email: email, name: name, password: password, confirm_password : confirmPassword }),
      headers: myHeaders });
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


export async function checkIsLogged() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/api/islogged", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({token: localStorage.getItem("token")})

    });
    try {
      return await fetch(req).then(async (res) => {
        const response = { status: res.status, response: await res.json() }
        return response;
      });
    } catch (e) {
      return { status: 500, response: { message: "Check connection" } };
    }
  }

export async function getWatchlist() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/api/watchlist", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({token: localStorage.getItem("token")})
    });
  
    try {
      console.log(req)
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



  export async function getMarketNews() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/api/market-news", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({token: localStorage.getItem("token")})
    });
  
    try {
      console.log(req)
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
export async function doBuyStocks( ticker, qt, unit_price) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/api/buystocks", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ token: localStorage.getItem("token"), ticker: ticker, qt: qt, unit_price : unit_price}),
    });
  
    try {
      // console.log(req)
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
export async function doSellStocks( ticker, qt, unit_price) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/api/sellstocks", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ token: localStorage.getItem("token"), ticker: ticker, qt: qt, unit_price : unit_price}),
    });
  
    try {
      // console.log(req)
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
      body: JSON.stringify({ticker: symbol, token: localStorage.getItem("token")}),
      headers: myHeaders,
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
      body: JSON.stringify({ticker: symbol, token: localStorage.getItem("token")}),
      headers: myHeaders,
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

  // export async function getProfile(ticker) {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Accept", "*/*");
  
  //   const req = new Request(url + "/api/profile/"+ ticker, {
  //     method: "GET",
  //     headers: myHeaders,
  //     credentials: "include",
  //   });
  
  //   try {
  //     return await fetch(req).then(async (res) => {
  //       if (res.status === 204) {
  //         return {
  //           status: res.status,
  //           response: { message: "No Authenticated" },
  //         };
  //       }
  //       return { status: res.status, response: await res.json() };
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     return { status: 500, response: { message: "Check connection" } };
  //   }
  // }

  export async function getAssets() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/api/assets", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({token: localStorage.getItem("token")})
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

  export async function getCash() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
  
    const req = new Request(url + "/api/cash", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({token: localStorage.getItem("token")})
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
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({token: localStorage.getItem("token")})
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
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({token: localStorage.getItem("token")})

      // credentials: "include",
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
    });
  
    // Send logout request
    try {
      const response = await fetch(url + "/logout", {
        method: "POST",
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