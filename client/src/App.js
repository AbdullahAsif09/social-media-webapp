import "./App.css";
import "./style.scss"
import "./app.scss"
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signupp.jsx";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { CreateContext } from "./context/AuthContext";
import Messanger from "./pages/Messanger/Messanger";
function App() {
  const {user , darkmode} = useContext(CreateContext)
  return (
    <div className={darkmode === false ? "theme-light" : "theme-dark"}>
      <div className="theme-set">
        <Router>
          <Routes>
            <Route path="/register" element={<Signup />} />
            <Route
              path="/login"
              element={
                user === null || user === undefined ? <Login /> : <Home />
              }
            />
            <Route
              path="/"
              element={
                user === null || user === undefined ? <Login /> : <Home />
              }
            />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/messenger" element={<Messanger />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
