import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js"; // Function to generate JWT tokens
import { getStockSymbols } from "./apiController.js";
// import {companies} from './apiController.js'
const quotesApiKey = process.env.QUOTES_API_KEY;
const quotesApiServer = process.env.QUOTES_API_SERVER;


export async function login(req, res) {
  const { email, password } = req.body;
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
        .status(200)
        .json({ message: "Logged in successfully", token: token });
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
  // res.status(200).json({response : req.user});

  try {
    const findUser = await sql`
      SELECT email, name
      FROM stock_users
      WHERE email = ${req.user.email}
      `;
    // console.log(findUser)

    res.status(200).json(findUser.rows[0]);
    // if (findUser.rows[0]) {
    // } else {
    //   res.status(404).json({ message: "Invalid Session" });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid Session" });
  }
}

export async function getWatchlist(req, res) {
  try {
    const findUser = await sql`
      SELECT *
      FROM stock_watchlist
      WHERE email = ${req.user.email}
      `;
    // console.log(findUser)

    res.status(200).json(findUser.rows);
    // if (findUser.rows[0]) {
    // } else {
    //   res.status(404).json({ message: "Invalid Session" });
    // }
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
export async function buyStocks(req, res) {
  const { ticker, qt, unit_price } = req.body;
  const { email } = req.user;
  console.log(email);
  console.log(ticker);
  console.log(qt);
  console.log(unit_price);
  try {
    const insertUser = await sql`
SELECT buy_stocks(${email}, ${ticker}, ${qt}, ${unit_price}) as transaction_success;
        `;
    console.log(insertUser);
    // if (insertUser.rowCount == 1) {
    res.status(200).json({ message: `BUY sucessfully!` });
    // } else {
    //   res.status(404).json({ message: "Invalid Session" });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid Session" });
  }
}
export async function sellStocks(req, res) {
  const { ticker, qt, unit_price } = req.body;
  const { email } = req.user;
  console.log(email);
  console.log(ticker);
  console.log(qt);
  console.log(unit_price);
  try {
    const insertUser = await sql`
SELECT sell_stocks(${email}, ${ticker}, ${qt}, ${unit_price}) as transaction_success;
        `;
    console.log(insertUser);
    // if (insertUser.rowCount == 1) {
    res.status(200).json({ message: `SELL sucessfully!` });
    // } else {
    //   res.status(404).json({ message: "Invalid Session" });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid Session" });
  }
}

export async function removeFromWatchlist(req, res) {
  const { ticker } = req.body;
  const { email } = req.user;

  try {
    const removedTicker = await sql`
          DELETE FROM stock_watchlist
          WHERE ticker = ${ticker} AND email = ${email}
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

// export async function logout(req, res) {
//   return res
//     .clearCookie("token")
//     .status(200)
//     .json({ message: "Logged out successfully" });
// }

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

export async function getCash(req, res) {
  try {
    const findUser = await sql`
        SELECT *
        FROM stock_cash
        WHERE email = ${req.user.email}
        `;
    if (findUser.rows[0]) {
      res.status(200).json(findUser.rows[0]);
    } else {
      res.status(404).json({ message: "Invalid Session" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid Session" });
  }
}
export async function getStockQuote(req, res) {
  console.log("getStockQuote called");
  try {
    const ticker = req.params.ticker.toUpperCase();
    console.log(ticker);
    const apiUrl = `${quotesApiServer}/getquote/?token=${quotesApiKey}&ticker=${ticker}`;
    const data = await fetch(apiUrl);
    const companies = await data.json();
    console.log(companies);
    res.status(200).json(companies);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error getting quotes" });
  }
}

export async function updateUser(req, res) {
  const { email } = req.user;
  const { name, password, confirm_password } = req.body;

  //check if password and confirm_password are the same
  if (password !== confirm_password) {
    res
      .status(500)
      .json({ message: "Password and Confirm Password doesn't match" });
    return;
  }

  try {
    //if no password, update only name
    if (password == "") {
      const resultUpdate = await sql`
      UPDATE stock_users
      SET name = ${name}
      WHERE email = ${email}
      `;
      res.status(200).json({ message: "User updated sucessfully" } );
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const resultUpdate = await sql`
      UPDATE stock_users
      SET name = ${name},
      password = ${hashedPassword}
      WHERE email = ${email}
      `;
      res.status(200).json({ message: "User updated sucessfully" } );
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid Session" });
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
