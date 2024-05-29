import React from "react";
import { Routes, Route } from "react-router-dom";
import Userregister from "./components/Userregister";
import Address from "./components/Address";
import UserPage from "./components/UserPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Userregister />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
