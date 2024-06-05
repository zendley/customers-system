import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AppRouter from "./AppRouter.js";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}
