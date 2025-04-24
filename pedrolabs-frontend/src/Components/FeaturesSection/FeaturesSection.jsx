import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FeaturesSection.css";
import { motion } from "framer-motion";

function FeaturesSection() {
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
    hidden: { opacity: 0, y: -50 }, // Initial state
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }, // Animation state
  };

  return (
    <div>
      <section
        id="features"
        className="features-section"
        style={{ marginTop: "60px" }}
      >
        {/* Section Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          variants={containerVariants}
        >
          <Container
            className="section-title d-flex flex-column justify-content-center align-items-center"
            data-aos="fade-up"
          >
            <motion.h2 variants={leftToRightitemVariants}>
              {" "}
              <span style={{ color: "#ff0500" }}>Empowering</span> Your{" "}
              <span style={{ color: "#ff0500" }}>Health</span> Journey
            </motion.h2>
            <motion.p variants={leftToRightitemVariants}>
              Your trusted source for innovative health devices and products
              designed to improve your well-being and quality of life.
            </motion.p>
          </Container>
        </motion.div>

        <Container className="mt-3">
          <Row className=" align-items-center features-item">
            <Col
              lg={5}
              className="order-2 order-lg-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                variants={containerVariants}
              >
                <motion.h3 variants={leftToRightitemVariants}>
                  Our <span style={{ color: "#ff0500" }}> Mission</span>
                </motion.h3>
                <motion.p variants={leftToRightitemVariants}>
                  At Pedro Labs, we are committed to bringing you cutting-edge
                  health technology and products that support your journey to
                  better health. Our mission is to provide high-quality,
                  reliable, and user-friendly solutions for your health and
                  wellness needs. At Pedro Labs, we are committed to bringing
                  you cutting-edge health technology and products that support
                  your journey to better health. Our mission is to provide
                  high-quality, reliable, and user-friendly solutions for your
                  health and wellness needs.
                </motion.p>
                {/* <Button href="#" className="btn-get-started">
                Get Started
              </Button> */}
              </motion.div>
            </Col>

            <Col
              lg={7}
              className="order-1 order-lg-2 d-flex align-items-center"
              data-aos="zoom-out"
              data-aos-delay="100"
            >
              <motion.div
                className="image-stack"
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                variants={leftToRightitemVariants}
              >
                <img
                  src="./about page/adobestock-835024568.webp"
                  alt=""
                  className="stack-front"
                />
                <img
                  src="./about page/adobestock-835024568-modified.webp"
                  alt=""
                  className="stack-back"
                />
              </motion.div>
            </Col>
          </Row>

          <Row className=" align-items-center features-item ">
            <Col
              lg={7}
              className="order-1 order-lg-1 d-flex align-items-center"
              data-aos="zoom-out"
              data-aos-delay="100"
            >
              <motion.div
                className="image-stack"
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                variants={leftToRightitemVariants}
              >
                <img
                  src="./about page/istockphoto-531475568-612x612-modified.jpg"
                  alt=""
                  className="stack-back"
                />
                <img
                  src="./about page/istockphoto-531475568-612x612.jpg"
                  alt=""
                  className="stack-front"
                />
              </motion.div>
            </Col>

            <Col
              lg={5}
              className="order-2 order-lg-2"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                variants={containerVariants}
              >
                <motion.h3 variants={leftToRightitemVariants}>
                  Our <span style={{ color: "#ff0500" }}> Vision</span>
                </motion.h3>
                <motion.p variants={leftToRightitemVariants}>
                  At Pedro Labs, we are committed to bringing you cutting-edge
                  health technology and products that support your journey to
                  better health. Our mission is to provide high-quality,
                  reliable, and user-friendly solutions for your health and
                  wellness needs. At Pedro Labs, we are committed to bringing
                  you cutting-edge health technology and products that support
                  your journey to better health. Our mission is to provide
                  high-quality, reliable, and user-friendly solutions for your
                  health and wellness needs.
                </motion.p>
                {/* <Button href="#" className="btn-get-started">
                Get Started
              </Button> */}
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default FeaturesSection;
