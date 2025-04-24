import React from "react";
import "./Online.css";
import { Container, Row, Col } from "react-bootstrap";

import { motion } from "framer-motion";

function Online() {
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

  const rightToLeftitemVariants = {
    hidden: { opacity: 0, y: -50 }, // Initial state
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }, // Animation state
  };

  return (
    <>
      <Container className="d-flex flex-column align-items-center justify-content-center text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          variants={containerVariants}
        >
          <Row className="" style={{ marginTop: "55px" }}>
            <Col xs={12}>
              <motion.h1
                className="online-heading"
                variants={leftToRightitemVariants}
              >
                Easily bring complex processes online
              </motion.h1>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col xs={12}>
              <motion.p
                className="online-paragraph"
                variants={leftToRightitemVariants}
              >
                At Pedro Labs, we simplify the process of purchasing
                high-quality medical devices, bringing cutting-edge solutions to
                healthcare providers. Our platform offers a seamless and
                efficient experience, ensuring that you have access to the best
                products, all while maintaining the highest standards of service
                and reliability.
              </motion.p>
            </Col>
          </Row>
        </motion.div>

        <Row className="d-flex justify-content-center">
          <Col xs={12} md={8} lg={6} className="d-flex justify-content-center">
            <motion.div
              variants={rightToLeftitemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
            >
              <img
                src="https://www.sana-commerce.com/wp-content/uploads/Complexity-Top-Banner-2160x1800-c-default.webp"
                alt="Example"
                className="img-fluid" // Ensures responsiveness
                style={{ maxWidth: "100%" }}
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Online;
