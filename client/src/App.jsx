// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./Layout";
import WatchlistPage from "./pages/WatchlistPage";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Assets from "./pages/Assets";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="watchlist" element={<WatchlistPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="logout" element={<Logout />} />
          <Route path="assets" element={<Assets />} />
          <Route path="profile" element={<Profile />} />
          <Route path="transactions/:ticker" element={<Transactions />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
          {/*<Route path="/courses/:programCode" element={<Courses />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="registration" element={<Registration />} />
          <Route path="students" element={<Students />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="test" element={<Test />} />
          <Route path="students-details" element={<StudentsDetails />} />
          <Route path="/students-details/:studentId" element={<StudentsDetails />} />
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
