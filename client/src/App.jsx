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
import Alert from "./components/Alert";
import News from "./pages/News";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="watchlist" element={<WatchlistPage />} />
            <Route path="signup" element={<Signup />} />
            <Route path="logout" element={<Logout />} />
            <Route path="assets" element={<Assets />} />
            <Route path="profile" element={<Profile />} />
            <Route path="transactions/:ticker" element={<Transactions />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="news" element={<News />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Alert />
    </>
  );
}

export default App;
