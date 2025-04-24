import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./Components/Register/Register.jsx";
import AboutUs from "./pages/AboutUs/AboutUs";
import Services from "./pages/services/Services";
import Preloader from "./Components/Preloader/Preloader";
import Authnew from "./Components/Register/Authnew.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Product from "./pages/productPage/Product.jsx";
import Test from "./Components/test/Test.jsx";
import { useState } from "react";
import ProtectedAdminRoute from "./ProtectedAdminRoute.jsx";
import ProtectedUserRoute from "./ProtectedUserRoute.jsx";
import UnauthorizedPage from "./UnauthorizedPage.jsx"; // Add the UnauthorizedPage import
import Cart from "./pages/Cart/Cart.jsx";
import SingleProduct from "./pages/SingleProduct/SingleProduct.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />

        {/* Protected admin routes */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/product" element={<Product />} />
        {/* Protected User Route */}
        <Route element={<ProtectedUserRoute />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/test" element={<Test />} />
        <Route path="/authnew" element={<Authnew />} />
        <Route path="/preloader" element={<Preloader />} />

        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
