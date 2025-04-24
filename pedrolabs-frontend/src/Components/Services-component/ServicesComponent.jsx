import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faBriefcaseMedical,
  faShoppingCart,
  faTag,
  faSmile,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ServicesComponent.css";
import { motion } from "framer-motion";

const servicesData = [
  {
    imgSrc: "./about page/adobestock-835024568.webp",
    icon: faStar,
    title: "Trusted Expertise",
    description:
      "At Pedro, we are committed to providing high-quality medicines and medical devices backed by years of experience in the healthcare industry.",
  },
  {
    imgSrc: "./service-page/file-20200407-116223-gwtpno.avif",
    icon: faBriefcaseMedical,
    title: "Wide Range of Products",
    description:
      "We offer an extensive catalog of medical products, including prescription medications, over-the-counter remedies, and essential medical devices.",
  },
  {
    imgSrc: "./service-page/school-nurse-and-student-bump-elbows-1080.jpg",
    icon: faShoppingCart,
    title: "Convenience and Accessibility",
    description:
      "Shopping for medicines and medical devices can be time-consuming and overwhelming.",
  },
  {
    imgSrc: "./service-page/Tine-Website-Photos-Articles-8.webp",
    icon: faTag,
    title: "Affordable Prices",
    description:
      "We understand the importance of affordability when it comes to healthcare. That's why we strive to offer competitive prices on all our products.",
  },
  {
    imgSrc: "./service-page/need-assessment-nurse-education.jpg",
    icon: faSmile,
    title: "Customer-Centered Service",
    description:
      "At Pedro, our customers are our priority. We pride ourselves on providing exceptional customer service.",
  },
  {
    imgSrc: "./service-page/prism-do-something-meaningful-nursing.jpg",
    icon: faLock,
    title: "Safe and Secure Shopping",
    description:
      "Our website is designed with the latest security features to ensure your personal information and transactions are protected.",
  },
];

function ServicesComponent() {
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
    <div className="py-5">
      <Container>
        <motion.div
          className="text-center mx-auto servicesComponent-title"
          style={{ maxWidth: "500px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.p className="fs-5 fw-bold" variants={leftToRightitemVariants}>
            Our Services
          </motion.p>
          <motion.h1
            className="display-5 mb-5"
            variants={leftToRightitemVariants}
          >
            Services That We Offer For You
          </motion.h1>
        </motion.div>
        <Row className="g-4">
          {servicesData.map((service, index) => (
            <Col lg={4} md={6} key={index}>
              <motion.div
                className="service-item rounded d-flex h-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                variants={leftToRightitemVariants}
              >
                <div className="service-img rounded">
                  <img
                    className="img-fluid"
                    src={service.imgSrc}
                    alt={service.title}
                  />
                </div>
                <div className="service-text rounded p-5">
                  <div className="  mx-auto mb-3 serviceIcon">
                    <FontAwesomeIcon icon={service.icon} size="3x" />
                  </div>
                  <h4 className="mb-3">{service.title}</h4>
                  <p className="mb-4">{service.description}</p>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ServicesComponent;
