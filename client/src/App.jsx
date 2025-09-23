import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatPage from "./pages/Chat";


const App = () => {
  const token = localStorage.getItem("token"); 
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={ <ChatPage />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />

          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
