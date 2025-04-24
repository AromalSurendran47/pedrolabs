import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { FaAward, FaUsers } from "react-icons/fa";
import "./Award.css";
import { motion } from "framer-motion";

function Award() {
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
    <div className="award-section" style={{ marginTop: "70px" }}>
      <Container>
        <Row className="g-5 align-items-center">
          {/* Image Section */}
          <Col lg={4} md={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              variants={leftToRightitemVariants}
            >
              <Image
                src="./service-page/Health-Insurance.jpg"
                fluid
                rounded
                alt="Award Section"
                className="feature-box"
              />
            </motion.div>
          </Col>

          {/* Main Text Section */}
          <Col
            lg={5}
            md={6}
            className="text-center text-md-start main-text-section"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              variants={containerVariants}
            >
              <motion.h1
                className="display-1 mb-0 text-highlight"
                style={{ fontWeight: "bolder" }}
                variants={leftToRightitemVariants}
              >
                25
              </motion.h1>
              <motion.p className="experience" variants={leftToRightitemVariants}>Years of Experience</motion.p>
              <motion.h2 className="display-5 mb-4 title-text" variants={leftToRightitemVariants}>
                Our Awards Reflect Your Wellness
              </motion.h2>
              <motion.p className="description" variants={leftToRightitemVariants}>
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet.
              </motion.p>
            </motion.div>
          </Col>

          {/* Feature Section */}
          <Col lg={3}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            variants={containerVariants}
          >
          <Row className="g-4">
              <Col xs={12}>
                <motion.div className="feature-box shadow-sm" variants={leftToRightitemVariants}>
                  <FaAward className="fa-3x mb-3 text-highlight" />
                  <h4>Award Winning</h4>
                  <p>Clita erat ipsum et lorem et sit, duo justo magna.</p>
                </motion.div>
              </Col>
              <Col xs={12}>
                <motion.div className="feature-box shadow-sm" variants={leftToRightitemVariants}>
                  <FaUsers className="fa-3x mb-3 text-highlight" />
                  <h4>Dedicated Team</h4>
                  <p>Clita erat ipsum et lorem et sit, duo justo magna.</p>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Award;
