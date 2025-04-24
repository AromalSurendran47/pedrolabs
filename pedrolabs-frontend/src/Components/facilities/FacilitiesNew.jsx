import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./FacilitiesNew.css"; // Add custom CSS for enhanced styles

import { motion } from "framer-motion";

function FacilitiesNew() {
  const handleMouseMove = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X relative to the container
    const y = e.clientY - rect.top; // Mouse Y relative to the container
    const centerX = rect.width / 2; // Center X of the container
    const centerY = rect.height / 2; // Center Y of the container

    // Calculate rotation values based on the mouse position
    const rotateX = ((centerY - y) / centerY) * 4; // Rotate up/down
    const rotateY = ((x - centerX) / centerX) * 4; // Rotate left/right

    // Update the CSS variables for rotation
    container.style.setProperty("--rotateX", `${rotateX}deg`);
    container.style.setProperty("--rotateY", `${rotateY}deg`);
  };

  const handleMouseLeave = (e) => {
    // Reset the rotation when the mouse leaves
    e.currentTarget.style.setProperty("--rotateX", `0deg`);
    e.currentTarget.style.setProperty("--rotateY", `0deg`);
  };

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
    <div>
      <Container>
        <div className="facilitiesNew-container">
          <motion.h1
            className="d-flex justify-content-center facilities-title"
            variants={leftToRightitemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
          >
            See what’s going on
          </motion.h1>
          <Row className="mt-4">
            <Col xs={12} md={6} className="facility-col">
              <motion.div
                className="image-container"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                variants={leftToRightitemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
              >
                <img
                  src="./facilities/istockphoto-1354171846-612x612.jpg"
                  alt="Pharmaceuticals"
                  className="image-3d"
                />
              </motion.div>
            </Col>
            <Col xs={12} md={6} className="facility-col">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                variants={containerVariants}
              >
                <motion.h2
                  className="facility-heading"
                  variants={rightToLeftitemVariants}
                >
                  Pharmaceuticals
                </motion.h2>
                <motion.p
                  className="facility-paragraph"
                  variants={rightToLeftitemVariants}
                >
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content. Some quick example text to
                  build on the card title and make up the bulk of the card's
                  content. Some quick example text to build on the card title
                  and make up the bulk of the card's content. Some quick example
                  text to build on the card title and make up the bulk of the
                  card's content.
                </motion.p>
                <motion.div
                  className="read-more-container"
                  variants={rightToLeftitemVariants}
                >
                  <a href="#" className="read-more-link">
                    Read More
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
          <div className="divider"></div> {/* Divider between rows */}
          <Row className="mt-4">
            <Col xs={12} md={6} className="facility-col">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                variants={containerVariants}
              >
                <motion.h2
                  className="facility-heading"
                  variants={leftToRightitemVariants}
                >
                  Medical Devices
                </motion.h2>

                <motion.p
                  className="facility-paragraph"
                  variants={leftToRightitemVariants}
                >
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content. Some quick example text to
                  build on the card title and make up the bulk of the card's
                  content. Some quick example text to build on the card title
                  and make up the bulk of the card's content. Some quick example
                  text to build on the card title and make up the bulk of the
                  card's content.
                </motion.p>
                <motion.div
                  className="read-more-container"
                  variants={leftToRightitemVariants}
                >
                  <a href="#" className="read-more-link">
                    Read More
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </motion.div>
              </motion.div>
            </Col>
            <Col xs={12} md={6} className="facility-col">
              <motion.div
                className="image-container"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}

                variants={rightToLeftitemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
              >
                <img
                  src="./facilities/gettyimages-520853878-640x640.jpg"
                  alt="Laboratory Services"
                  className="image-3d"
                />
              </motion.div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default FacilitiesNew;
