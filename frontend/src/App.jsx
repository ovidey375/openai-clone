import React, { useContext } from "react";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const [authUser] = useContext(AuthContext);
  // console.log(authUser);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <Signup />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
      </Routes>
    </div>
  );
};

export default App;
