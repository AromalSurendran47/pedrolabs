import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./About.css";
import { motion } from "framer-motion";

function About() {
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
  const leftToRightContainerVariants = {
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
        <Row className="homepage-about-section">
          <Col xs={12} md={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              variants={leftToRightContainerVariants}
            >
              {/* Heading */}
              <motion.h1
                className="mb-4 about-heading"
                variants={leftToRightitemVariants}
              >
                About Pedro care
              </motion.h1>
              {/* Paragraph */}
              <motion.p
                className="about-paragraph"
                variants={leftToRightitemVariants}
              >
                A system of health centers that provide an array of health
                services from a team of board-certified providers. As your
                Patient Centered Medical Home, we offer team-based care focused
                on improving your health as well as your healthcare experience.
                Our health centers use new technologies, convenient care
                delivery methods, and focus on creating relationships with
                patients and their families so that all of the care we provide
                is patient-centered, comprehensive, coordinated, accessible,
                affordable, and of the highest quality. We offer Care Management
                services for patients who have or are at high risk for chronic
                illness or disease.
              </motion.p>
              {/* Read More Button */}
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

          <Col xs={12} md={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              variants={rightToLeftitemVariants}
              className="image-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src="./doctor-your-kid-needs.jpg"
                alt="About"
                className="image-3d "
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
