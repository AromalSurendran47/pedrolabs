import React from "react";
import "./Facilities.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Facilities() {
  return (
    <>
      <Container>
        <div className="mt-4 ">
          <h1 className="d-flex justify-content-center facilities-title">
            See what’s going on
          </h1>
          <Row className="mt-4">
            <Col xs={12} md={4} className="">
              <Card style={{ width: "22rem" }}>
                <Card.Img
                  variant="top"
                  src="./facilities/360_F_485934681_FjwxqkBDk9lLnQsM8yVdHC9hKf49Tis3.jpg"
                  height={"200px"}
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title className="facilities-heading">
                    Health Care
                  </Card.Title>
                  <Card.Text className="facilities-paragraph">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content. Some quick example text
                    to build on the card title and make up the bulk of the
                    card's content.
                  </Card.Text>
                  <div className="read-more-container">
                    <a href="#" className="read-more-link">
                      Read More
                      <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card style={{ width: "22rem" }}>
                <Card.Img
                  variant="top"
                  src="./facilities/istockphoto-1354171846-612x612.jpg"
                  height={"200px"}
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title className="facilities-heading">
                    Pharmaceuticals
                  </Card.Title>
                  <Card.Text className="facilities-paragraph">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content. Some quick example text
                    to build on the card title and make up the bulk of the
                    card's content.
                  </Card.Text>
                  <div className="read-more-container">
                    <a href="#" className="read-more-link">
                      Read More
                      <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card style={{ width: "22rem" }}>
                <Card.Img
                  variant="top"
                  src="./facilities/gettyimages-520853878-640x640.jpg"
                  height={"200px"}
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title className="facilities-heading">
                    Medical Devices
                  </Card.Title>
                  <Card.Text className="facilities-paragraph">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content. Some quick example text
                    to build on the card title and make up the bulk of the
                    card's content.
                  </Card.Text>
                  <div className="read-more-container">
                    <a href="#" className="read-more-link">
                      Read More
                      <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Facilities;
