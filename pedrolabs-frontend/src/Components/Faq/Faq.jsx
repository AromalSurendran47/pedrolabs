import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import "./Faq.css";
import { motion } from "framer-motion";

function Faq() {
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

  const faqData = [
    {
      question: "What Does This Tool Do?",
      answer:
        "Placeholder content for this accordion, demonstrating the first item.",
    },
    {
      question: "What Are The Disadvantages Of Online Trading?",
      answer: "This section discusses potential drawbacks of online trading.",
    },
    {
      question: "Is Online Trading Safe?",
      answer: "This section addresses security concerns with online trading.",
    },
    {
      question: "What Is Online Trading, And How Does It Work?",
      answer: "Explanation of online trading and how it operates.",
    },
    {
      question: "Which App Is Best For Online Trading?",
      answer: "Recommendations for the best online trading apps.",
    },
    {
      question: "How To Create A Trading Account?",
      answer: "Step-by-step guide on creating a trading account.",
    },
  ];

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
    <div className="faq-section " style={{ marginTop: "35px" }}>
      <Container className=" overflow-hidden">
        <motion.div
          className="text-center mx-auto pb-5 faqDiv "
          style={{ maxWidth: "800px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.p
            className="fs-5 fw-bold faqComponent-title"
            variants={leftToRightitemVariants}
          >
            FAQs
          </motion.p>
          <motion.h1
            className="display-5 mb-3"
            variants={leftToRightitemVariants}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p className="mb-0" variants={leftToRightitemVariants}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
            adipisci facilis cupiditate recusandae aperiam temporibus corporis
            itaque quis facere, numquam, ad culpa deserunt sint dolorem autem
            obcaecati, ipsam mollitia hic.
          </motion.p>
        </motion.div>

        <Row className="g-5 align-items-center">
          <Col lg={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              variants={leftToRightitemVariants}
            >
              <Accordion defaultActiveKey="0" className="bg-light rounded p-3">
                {faqData.map((item, index) => (
                  <Accordion.Item
                    eventKey={index.toString()}
                    key={index}
                    className="rounded"
                  >
                    <Accordion.Header>{item.question}</Accordion.Header>
                    <Accordion.Body>{item.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </motion.div>
          </Col>

          <Col lg={6}>
            <motion.div
              className=" rounded  image-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2 }}
              variants={leftToRightitemVariants}
            >
              <img
                src="./about page/Solutions-Industries-Healthcare-1.png"
                fluid
                className="w-100 image-3d"
                alt="FAQ Section"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Faq;
