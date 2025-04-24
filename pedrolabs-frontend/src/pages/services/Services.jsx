import React, { useEffect, useState } from "react";
import Award from "../../Components/Award/Award";
import ServicesComponent from "../../Components/Services-component/ServicesComponent";
import "./Services.css";
import Preloader from "../../Components/Preloader/Preloader";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";



function Services() {
  


  // loading
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(""); // userName state
  const [cart, setCart] = useState({}); // Track added quantities

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        sessionStorage.removeItem("userName"); // Clear session storage
        localStorage.removeItem("cart"); //  Clear cart from localStorage
        setUserName(""); // Reset the userName state
        setCart({}); //  Reset cart state in React
        window.location.href = "/authnew"; // Redirect to login page
      };
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />; 
  }

  return (
 
      <div>
        <Header userName={userName} handleLogout={handleLogout} cart={cart}/>
        <img
          src="https://i.pinimg.com/736x/36/42/29/3642291603d80cbf90ee7421ba227a8b.jpg"
          alt=""
          className="banner-image"
          width={"100%"}
          height={"350px"}
        />

        <div className=" hide-on-small">
          <Award />
        </div>

        <div>
          <ServicesComponent />
        </div>
        <Footer/>
      </div>
   
  );
}

export default Services;
