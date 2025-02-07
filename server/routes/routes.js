import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import * as dbController from "../controllers/dbController.js";
import * as apiController from "../controllers/apiController.js";

const router = express.Router();

router.post("/api/islogged", authenticateToken, dbController.checkIsLogged);

//Database Routes
router.post("/api/login", dbController.login);
router.get("/api/login-guest", dbController.loginGuest);
router.post("/api/watchlist", authenticateToken, dbController.getWatchlist);

router.post("/api/signup", dbController.signup);
router.post("/api/update_user", authenticateToken, dbController.updateUser);
router.post("/api/assets", authenticateToken, dbController.getAssets);
router.post("/api/cash", authenticateToken, dbController.getCash);
router.put(
  "/api/add_to_watchlist",
  authenticateToken,
  dbController.addToWatchlist
);
router.post("/api/sellstocks", authenticateToken, dbController.sellStocks);
router.post("/api/buystocks", authenticateToken, dbController.buyStocks);
router.delete(
  "/api/remove_from_watchlist",
  authenticateToken,
  dbController.removeFromWatchlist
);
// // router.post('/signup', userControler.signup);
// // router.put('/updateuser', authenticateToken, userControler.updateUser);
// // router.post('/logout', userControler.logout);

//API Routes
// router.get("/api/profile/:symbol", authenticateToken, apiController.getStockProfile);
router.post("/api/quote/:ticker", dbController.getStockQuote);
router.post("/api/symbols", apiController.getStockSymbols);
router.post("/api/market-news", authenticateToken, apiController.getMarketNews);
// router.get("/api/logout", dbController.logout);
// router.get("/symbols", authenticateToken, apiController.getStockSymbols);

// // //User Routes
// // router.post('/login', userControler.login);
// // router.post('/getuserprofile',authenticateToken, userControler.getUserProfile)
// // router.post('/signup', userControler.signup);
// // router.put('/updateuser', authenticateToken, userControler.updateUser);

// // //Program Routes
// // router.get('/getprograms', programController.getPrograms);
// // router.post('/addprogram',authenticateAdmin, programController.addProgram);
// // router.post('/editprogram', authenticateAdmin, programController.editProgram);
// // router.delete('/deleteprogram', authenticateAdmin, programController.deleteProgram);

// // //Course Routes
// // router.get('/getcourses/:programcode', courseController.getCourses);
// // router.get('/getterms', courseController.getTerms);
// // router.post('/addcourse', authenticateAdmin, courseController.addCourse);
// // router.post('/editcourse', authenticateAdmin, courseController.editCourse);
// // router.delete('/deletecourse', authenticateAdmin, courseController.deleteCourse);

// // //Message Routes
// // router.get('/getMessages',authenticateAdmin, messageController.getMessages);
// // router.post('/sendMessage/', authenticateToken, messageController.sendMessage);
// // router.delete('/deleteMessage/', authenticateAdmin, messageController.deleteMessage);
// // router.patch('/setMessageReadStatus/', authenticateAdmin, messageController.setMessageReadStatus);

// // //Student Routes
// // router.get('/getstudents/', authenticateAdmin, studentController.getStudents);
// // router.post('/getenrollments/', authenticateToken, studentController.getEnrollments);
// // router.post('/registercourse/', authenticateToken, studentController.registerCourse);
// // router.delete('/dropcourse/', authenticateToken,  studentController.dropCourse

// );

export default router;
