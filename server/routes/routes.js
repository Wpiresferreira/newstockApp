import express from 'express';
import {authenticateToken} from '../middlewares/authMiddleware.js';
import * as dbController from "../controllers/dbController.js";
import * as apiController from "../controllers/apiController.js";


const router = express.Router();

// router.get("/api/islogged", authenticateToken, dbController.getW);


//Database Routes
router.post("/api/login", dbController.login);
router.post("/api/signup", dbController.signup);
router.get("/api/watchlist", authenticateToken, dbController.getWatchlist);
router.get("/api/assets", authenticateToken, dbController.getAssets);
router.get("/api/cash", authenticateToken, dbController.getCash);
router.put(
  "/api/add_to_watchlist",
  authenticateToken,
  dbController.addToWatchlist
);
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
router.get("/api/quote/:symbol", dbController.getStockQuote);
// router.get("/symbols", authenticateToken, apiController.getStockSymbols);
router.get("/api/symbols", apiController.getStockSymbols);
router.get('/api/logout', dbController.logout);



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