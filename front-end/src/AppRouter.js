import React from "react";
import LoginAdmin from "./components/LoginAdmin/LoginAdmin.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

const AppRouter = () => {
    // Check if loginToken exists in localStorage
    const isLoggedIn = localStorage.getItem("custoken");

    return (
        <>    
            <Routes>
                <Route path="/" element={<LoginAdmin />} />
                {isLoggedIn && <Route path="/Dashboard" element={<Dashboard />} />}
                {!isLoggedIn && <Route path="/Dashboard" element={<Navigate to="/" />} />}
            </Routes>
        </>

    );
};

export default AppRouter;
