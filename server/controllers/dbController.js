import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js"; // Function to generate JWT tokens
import {companies} from './apiController.js'

export async function login(req, res) {
  const { email, password } = req.body;

  //delete before publish
  //  const  email = 'wagner_pires@icloud.com'
  //  const password = '123'
  // Validate if there is username
  if (!email) {
    return res.status(401).json({ message: "Please, insert your username!" });
  }

  // Validate if there is password, and lengh greater or equal 3
  if (!password || password.length < 3) {
    return res.status(401).json({ message: "Please, insert your password!" });
  }

  try {
    const user = await sql`
      SELECT * FROM stock_users
        WHERE email = ${email};`;
    if (user.rowCount == 0) {
      return res.status(404).json({ message: "Invalid User." });
    }
    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      // Generate JWT token for the authenticated user
      const token = generateToken(user.rows[0]);
      // Set the token in a cookie with httpOnly option for security
      // console.log(process.env.NODE_ENV === 'production')
      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        })
        .status(200)
        .json({ message: "Logged in successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error. Try again later" });
  }
}

export async function signup(req, res) {
  const { email, name, password } = req.body;

  //delete before publish
  if (!email) {
    return res.status(401).json({ message: "Please, insert your username!" });
  }

  // Validate if there is password, and lengh greater or equal 3
  if (!password || password.length < 3) {
    return res.status(401).json({ message: "Please, insert your password!" });
  }

  const passwordHashed = await bcrypt.hash(password, 10);

  try {
    const user = await sql`
      INSERT INTO stock_users (email, name, password)
      VALUES (${email}, ${name}, ${passwordHashed})
      `;
    if (user.rowCount == 0) {
      return res.status(404).json({ message: "Invalid User." });
    }

    return res.status(200).json({ message: "Signup successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error. Try again later" });
  }
}

export async function checkIsLogged(req, res) {
  console.log("req.user" + req.user);
  return res.status(200).json({ message: "User is logged" });
}

export async function getWatchlist(req, res) {
  try {
    const findUser = await sql`
      SELECT *
      FROM stock_watchlist
      WHERE email = ${req.user.email}
      `;

    if (findUser.rows[0]) {
      res.status(200).json(findUser.rows);
    } else {
      res.status(404).json({ message: "Invalid Session" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid Session" });
  }
}

export async function addToWatchlist(req, res) {
  const { ticker } = req.body;

  try {
    const insertUser = await sql`
        INSERT INTO stock_watchlist (email, ticker)
        VALUES (${req.user.email}, ${ticker})
        `;
    console.log(insertUser);
    if (insertUser.rowCount == 1) {
      res.status(200).json({ message: `${ticker} added sucessfully!` });
    } else {
      res.status(404).json({ message: "Invalid Session" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid Session" });
  }
}

export async function removeFromWatchlist(req, res) {
  const { ticker } = req.body;

  try {
    const removedTicker = await sql`
          DELETE FROM stock_watchlist
          WHERE ticker = ${ticker}
          `;
    console.log(removedTicker);
    if (removedTicker.rowCount >= 1) {
      res.status(200).json({ message: `${ticker} removed sucessfully!` });
    } else {
      res.status(404).json({ message: "Invalid Session" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid Session" });
  }
}

export async function logout(req, res) {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfully" });
}

export async function getAssets(req, res) {
  try {
    const findUser = await sql`
        SELECT *
        FROM stock_assets
        WHERE email = ${req.user.email}
        `;

    if (findUser.rows[0]) {
      res.status(200).json(findUser.rows);
    } else {
      res.status(404).json({ message: "Invalid Session" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid Session" });
  }
}
export async function getStockQuote(req, res) {
  setTimeout(() => {
    
    const symbol = req.params.symbol.toUpperCase();
    // const apiUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
    // const data = await fetch(apiUrl);
    // const posts = await data.json();
    // return posts;
    
    res.status(200).json(companies.filter((c)=> c.ticker === symbol)[0])
  },1000);
    // try {
      //   const resultSelect = await sql`
      //       SELECT *
      //       FROM stock_companies
      //       WHERE symbol = ${symbol}
  //       `;

  //   if (resultSelect.rowCount>0) {
  //     res.status(200).json(resultSelect.rows[0]);
  //   } else {
  //     res.status(404).json({ message: "Invalid Session" });
  //   }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "Invalid Session" });
  
  // }
}


export async function updateCompany(company) {
  try {
    // console.log(company)
    const resultUpdate = await sql`
          UPDATE stock_companies 
          SET c = ${company.quote.c},
          d = ${company.quote.d},
          dp = ${company.quote.dp},
          h = ${company.quote.h},
          l = ${company.quote.c},
          o = ${company.quote.o},
          pc = ${company.quote.pc},
          t = ${new Date(company.quote.t)}
          WHERE symbol = ${company.ticker}
      `;
    console.log(resultUpdate.rowCount>0?"OK":"Error");
    // // export async function updateCompany(company){
    //   try {
    //     const resultUpdate = await sql`
    //       INSERT INTO stock_companies (
    //       symbol,
    //     c,
    //     d,
    //     dp,
    //     h,
    //     l,
    //     o,
    //     pc,
    //     t,
    //     country,
    //     currency,
    //     estimateCurrency,
    //     exchange,
    //     finnhubIndustry,
    //     ipo,
    //     logo,
    //     marketCapitalization,
    //     name,
    //     phone,
    //     shareOutstanding,
    //     ticker,
    //     weburl
    //   )
    //     VALUES
    //   (
    //     ${company.ticker},
    //     ${company.quote.c},
    //     ${company.quote.d},
    //     ${company.quote.dp},
    //     ${company.quote.h},
    //     ${company.quote.l},
    //     ${company.quote.o},
    //     ${company.quote.pc},
    //     ${new Date(company.quote.t)},
    //     ${company.profile.country},
    //     ${company.profile.currency },
    //     ${company.profile.estimateCurrency},
    //     ${company.profile.exchange},
    //     ${company.profile.finnhubIndustry},
    //     ${company.profile.ipo},
    //     ${company.profile.logo},
    //     ${company.profile.marketCapitalization},
    //     ${company.profile.name},
    //     ${company.profile.phone},
    //     ${company.profile.shareOutstanding},
    //     ${company.profile.ticker},
    //     ${company.profile.weburl}
    //   )

    // {
    //   ticker: 'ABEV',
    //   quote: {
    //     c: 1.9,
    //     d: 0,
    //     dp: 0,
    //     h: 1.92,
    //     l: 1.89,
    //     o: 1.92,
    //     pc: 1.9,
    //     t: 1735074000
    //   },
    //   profile: {
    //     country: 'BR',
    //     currency: 'BRL',
    //     estimateCurrency: 'BRL',
    //     exchange: 'B3 S.A.',
    //     finnhubIndustry: 'Beverages',
    //     ipo: '2013-11-11',
    //     logo: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/ABEV3.SA.png',
    //     marketCapitalization: 192506.043836,
    //     name: 'Ambev SA',
    //     phone: '551121221414',
    //     shareOutstanding: 15757.66,
    //     ticker: 'ABEV3.SA',
    //     weburl: 'https://www.ambev.com.br/'
    //   }

    // if (resultUpdate.rowCount >0) {
    //   res.status(200).json(resultUpdate);
    // } else {
    //   res.status(404).json({ message: "Invalid Session" });
    // }
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: "Invalid Session" });
  }
}

// export async function signup (req, res) {
//   try {
//       const user = req.body;
//       if(!user.first_name || !user.last_name || !user.email || !user.phone || !user.birthday || !user.department || !user.program || !user.username || !user.password || !user.retypePassword){
//         res.status(400)
//           .json({message : "Incomplete fields."})
//           return
//       }
//       if(user.password  != user.retypePassword){
//         res.status(400)
//           .json({message : "Password and Retyped Password doesn't match"})
//           return
//       }

//       if(user.password.length <3){
//         res.status(400)
//           .json({message : "Password must have at least 3 characters"})
//           return
//       }

//       const searchUsername = await sql`
//       SELECT userid
//         FROM bvc_users
//         WHERE username = ${user.username}
//       `;

//       const searchEmail = await sql`
//       SELECT userid
//         FROM bvc_users
//         WHERE email = ${user.email}
//       `;

//       if (searchUsername.rowCount >0){
//         res.status(409)
//           .json({message : "username already exist"})
//           return
//       }
//       if (searchEmail.rowCount >0){
//         res.status(409)
//           .json({message : "Email already exist"})
//           return
//       }

//       const hashedpassword = bcrypt.hashSync(user.password, 10)

//       const insertUser = await sql`
//       INSERT INTO bvc_users (first_name, last_name, email, phone, birthday, department, program, username, password, isadmin)
//       VALUES (${user.first_name}, ${user.last_name}, ${user.email}, ${user.phone}, ${user.birthday}, ${user.department}, ${user.program}, ${user.username}, ${hashedpassword}, false)
//       `;
//       if (insertUser.rowCount ==1){
//           res.status(201)
//           .json({message : "Signup sucessful"})

//       }else{
//           res.status(404)
//           .json({message : "Cannot create User. Try again later"})
//           }
//       } catch (error) {
//           console.error(error)
//           res.status(500).json({message: 'Cannot create user!'});
//       }
// };

// export async function updateUser(req, res) {
//   const user = req.user
//   const userUpdated = req.body;

//     try {

//       var updateUser
//       if(userUpdated.password){
//         const hashedpassword = bcrypt.hashSync(userUpdated.password, 10)
//         updateUser = await sql`
//           UPDATE bvc_users
//           SET first_name= ${userUpdated.first_name},
//             last_name = ${userUpdated.last_name},
//             email = ${userUpdated.email},
//             phone = ${userUpdated.phone},
//             birthday = ${userUpdated.birthday},
//             department = ${userUpdated.department},
//             program = ${userUpdated.program},
//             username = ${userUpdated.username},
//             password = ${hashedpassword}
//           WHERE userid = ${user.userid}
//         `;
//       }else{
//         updateUser = await sql`
//         UPDATE bvc_users
//         SET first_name= ${userUpdated.first_name},
//         last_name = ${userUpdated.last_name},
//         email = ${userUpdated.email},
//         phone = ${userUpdated.phone},
//         birthday = ${userUpdated.birthday},
//         department = ${userUpdated.department},
//         program = ${userUpdated.program},
//         username = ${userUpdated.username}
//         WHERE userid = ${user.userid}
//         `;
//       }

//         if (updateUser.rowCount ==1){
//           res.status(201)
//           .json({message : "User updated sucessful"})

//   }else{
//       res.status(404)
//       .json({message : "Cannot update user. Try again later"})
//       }
//   } catch (error) {
//       console.error(error)
//       res.status(500).json({message: 'Cannot update user. '});
//   }
// }

// export async function logout (req, res) {
//   return res.clearCookie('token').status(200).json({ message: 'Logged out successfully' });
// };
