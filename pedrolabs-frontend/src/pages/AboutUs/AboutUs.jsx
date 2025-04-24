import React, { useEffect, useState } from "react";
import "./AboutUs.css";
import { Container, Row, Col } from "react-bootstrap";
import Strength from "../../Components/strength/Strength";
import FeaturesSection from "../../Components/FeaturesSection/FeaturesSection";
import Faq from "../../Components/Faq/Faq";
import { motion } from "framer-motion";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import Preloader from "../../Components/Preloader/Preloader";

function AboutUs() {
  const [loading, setLoading] = useState(true); // loading state
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
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between child animations
        delayChildren: 0.2, // Delay before the first child starts
      },
    },
  };

  const leftToRightitemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const rightToLeftitemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const handleMouseMove = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 4;
    const rotateY = ((x - centerX) / centerX) * 4;

    container.style.setProperty("--rotateX", `${rotateX}deg`);
    container.style.setProperty("--rotateY", `${rotateY}deg`);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty("--rotateX", `0deg`);
    e.currentTarget.style.setProperty("--rotateY", `0deg`);
  };

  return (
    <div>
      <Header userName={userName} handleLogout={handleLogout} cart={cart}/>
      <img
        src="./about page/Examples_of_Smart_Technology_in_Healthcare_Hero_T_9dc61fc1c8.jpg"
        className="banner-image"
        alt=""
        width={"100%"}
        height={"350px"}
      />
      <Container>
        <div className="grey-shape-about"></div>
        <div className="grey-shape-2-about"></div>

        <motion.div
          className=" whyPedro  d-flex flex-column justify-content-center align-items-center"
          style={{ marginTop: "60px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h1 variants={rightToLeftitemVariants}>
            Why choose <span style={{ color: "#ff0500" }}>Pedro</span>?
          </motion.h1>
          <motion.p variants={rightToLeftitemVariants}>
            Pedro offers high-quality medicines and medical devices with
            affordable prices, secure shopping, and fast delivery. Trust us for
            reliable health solutions and exceptional customer care.
          </motion.p>
        </motion.div>

        {/*section 2  */}
        <div>
          <Row
            className="  about-page-about-section"
            style={{ marginTop: "60px" }}
          >
            <Col xs={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                variants={containerVariants}
              >
                <motion.h1
                  className="mb-4 about-heading"
                  variants={leftToRightitemVariants}
                >
                  About Pedro care
                </motion.h1>
                <motion.p
                  className="about-paragraph"
                  variants={leftToRightitemVariants}
                >
                  A system of health centers that provide an array of health
                  services from a team of board-certified providers. As your
                  Patient Centered Medical Home, we offer team-based care
                  focused on improving your health as well as your healthcare
                  experience. Our health centers use new technologies,
                  convenient care delivery methods, and focus on creating
                  relationships with patients and their families so that all of
                  the care we provide is patient-centered, comprehensive,
                  coordinated, accessible, affordable, and of the highest
                  quality. We offer Care Management services for patients who
                  have or are at high risk for chronic illness or disease.
                  patients and their families so that all of the care we provide
                  is patient-centered, comprehensive, coordinated, accessible,
                  affordable, and of the highest quality. We offer Care
                  Management services for patients who have or are at high risk
                  for chronic illness or disease.
                </motion.p>
              </motion.div>
            </Col>

            <Col xs={12} md={6}>
              <motion.div
                className="image-container"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial="hidden"
                whileInView="visible"
                variants={rightToLeftitemVariants}
              >
                <img
                  src="./about page/about section.avif"
                  alt="About"
                  className="image-3d "
                />
              </motion.div>
            </Col>
          </Row>
        </div>
      </Container>
      <br />

      {/* <div className="">
        <MissionNew/>
      </div>  */}

      <div className="mt-5">
        <Strength />
      </div>

      <div className="">
        <FeaturesSection />
      </div>

      <div className="">
        {/* <FaqNew /> */}
        <Faq />
      </div>

      <motion.div
        className=" whyPedro mt-5 d-flex flex-column justify-content-center align-items-center "
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h1 variants={rightToLeftitemVariants}>
          What we<span style={{ color: "#ff0500" }}> Do</span>
        </motion.h1>
        <motion.p variants={rightToLeftitemVariants}>
          We provide a wide range of trusted healthcare products, ensuring
          convenience, reliability, and expert service for your well-being.
        </motion.p>
      </motion.div>
      <Footer />
    </div>
  );
}

export default AboutUs;
