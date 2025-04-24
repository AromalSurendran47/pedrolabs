import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import "./Carousal.css";

import { motion } from "framer-motion";

function Carousal() {

  const opacityItemVariants = {
    hidden: { opacity: 0,  }, // Initial state
    visible: { opacity: 1, transition: { duration: 0.8 } }, // Animation state
  };

  return (
    <div>
      <Container>
        <motion.div
          variants={opacityItemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
        >
        <Carousel className=" " style={{marginTop:'65px'}}>
          <Carousel.Item className="rounded-3">
            <img
              className="d-block w-100"
              src="https://d3ka6l1e5o2tqs.cloudfront.net/media/public/default_images/Stethoscopes_web.png" // Replace with your image URL
              alt="First slide"
            />
            
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://d3ka6l1e5o2tqs.cloudfront.net/media/public/default_images/under_5000_web_pzyZjac.png" // Replace with your image URL
              alt="First slide"
            />
            
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://d3ka6l1e5o2tqs.cloudfront.net/media/public/default_images/Mega_sale_web.png" // Replace with your image URL
              alt="First slide"
            />
            
          </Carousel.Item>
        </Carousel>
        </motion.div>
        
      </Container>
    </div>
  );
}

export default Carousal;
