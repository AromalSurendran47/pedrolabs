import React, { useState } from "react";
import { Container, Accordion, Card, Button } from "react-bootstrap";
import "./FaqNew.css"; // Custom styles

function FaqNew() {
  const questions = [
    {
      title: " How do I know if a product is right for me?",
      content:
        "We recommend consulting with a healthcare professional before using any new health product or device, especially if you have pre-existing conditions or concerns. Additionally, our product descriptions include detailed information to help you make an informed decision based on your needs.",
    },
    {
      title: "What payment methods do you accept?",
      content:
        "We accept various payment methods, including credit/debit cards (Visa, MasterCard, American Express), PayPal, and other secure payment options. You can select your preferred method during    checkout.",
    },
    {
      title: "What if my product is damaged or defective?",
      content:
        "If you receive a damaged or defective product, please contact our customer service team immediately. We will assist you with a replacement or refund based on the situation. Make sure to provide photos of the damaged product and packaging.",
    },
    {
      title: "What types of health products and devices do you offer?",
      content:
        "At Pedrolabs, we offer a wide range of health products and devices,including fitness trackers, wearable health monitors, nutritional supplements, wellness gadgets, and more. Our products are designed to help you maintain and improve your overall health and well-being.",
    },
  ];

  return (
    <Container className=" faqNewContainer">
      <h2 className="text-center mb-4 FaqNew-heading">
        Frequently Asked Questions
      </h2>
      <Accordion>
        {questions.map((item, index) => (
          <Accordion.Item
            eventKey={index}
            key={index}
            className="FaqNew-accordion-item"
          >
            <Accordion.Header className="FaqNew-accordion-heading">
              {item.title}
            </Accordion.Header>
            <Accordion.Body className="FaqNew-accordion-content">
              {item.content}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

export default FaqNew;
