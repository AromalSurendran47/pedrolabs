import React, { useState, useEffect } from "react";
import Carousal from "../Components/carousal/Carousal";
import About from "../Components/about/About";
import "./Home.css";
import Online from "../Components/online/Online";
import Brand from "../Components/brand/Brand";
import Testimonials from "../Components/Testimonials/Testimonials";
import FacilitiesNew from "../Components/facilities/FacilitiesNew";

import Preloader from "../Components/Preloader/Preloader";
import Header from "../Components/Header";
import Footer from "../Components/Footer/Footer";

function Home() {
  const [userName, setUserName] = useState("");
  const [cart, setCart] = useState({}); // Track added quantities

  useEffect(() => {
    // Retrieve the user's name from session storage
    const name = sessionStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  useEffect(() => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart)); //  Load cart from storage
      }
    }, []);

    const handleLogout = () => {
      sessionStorage.clear()
      sessionStorage.removeItem("userName"); // Clear session storage
      localStorage.removeItem("cart"); //  Clear cart from localStorage
      setUserName(""); // Reset the userName state
      setCart({}); //  Reset cart state in React
      window.location.href = "/authnew"; // Redirect to login page
    };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  // Render the Home component after loading is complete
  return (
    <div>
      <Header userName = {userName} handleLogout={handleLogout} cart={cart}/>

      <img
        src="./cover photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.avif"
        alt=""
        width={"100%"}
        height={"350px"}
        className="banner-image"
      />
      <div className="grey-shape"></div>
      <About />
      <FacilitiesNew />
      <Carousal />
      <div className="grey-shape-2"></div>
      <Online />
      <Testimonials />
      <Brand />

      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Welcome, {userName || "Guest"}!</h1>
        {/* {userName && (
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            // onClick={handleLogout}
          >
            Logout
          </button>
        )} */}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
