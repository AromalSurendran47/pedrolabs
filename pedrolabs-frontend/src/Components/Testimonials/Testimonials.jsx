import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import "./Testimonial.css";

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="heading text-center">
        <h2>
          What's <span>Clients</span> Says?
        </h2>
      </div>
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={12}>
            <Carousel indicators={true}>
              {/* Slide 1 */}
              <Carousel.Item>
                <img
                  src="./testimonials/download (2).jfif"
                  alt="Client"
                  className="team mx-auto"
                />
                <h3>Alamin Musa</h3>
                
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam porttitor dapibus dictum. Fusce faucibus ligula
                  scelerisque, eleifend turpis in. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Aliquam porttitor dapibus dictum.
                  Fusce faucibus ligula scelerisque, eleifend turpis in.
                </p>
              </Carousel.Item>
              {/* Slide 2 */}
              <Carousel.Item>
                <img
                  src="./testimonials/download.jfif"
                  alt="Client"
                  className="team mx-auto"
                />
                <h3>Alamin Musa</h3>
                
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam porttitor dapibus dictum. Fusce faucibus ligula
                  scelerisque, eleifend turpis in. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Aliquam porttitor dapibus dictum.
                  Fusce faucibus ligula scelerisque, eleifend turpis in.
                </p>
              </Carousel.Item>
              {/* Slide 3 */}
              <Carousel.Item>
                <img
                  src="./testimonials/download (4).jfif"
                  alt="Client"
                  className="team mx-auto"
                />
                <h3>Alamin Musa</h3>
                
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam porttitor dapibus dictum. Fusce faucibus ligula
                  scelerisque, eleifend turpis in. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Aliquam porttitor dapibus dictum.
                  Fusce faucibus ligula scelerisque, eleifend turpis in.
                </p>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Testimonials;
