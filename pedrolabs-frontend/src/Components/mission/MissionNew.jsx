import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './MissionNew.css';  // External CSS for styling

const gameImages = [
  'https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_1.jpg',
  'https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_2.jpg',
  'https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_3.jpg',
  'https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_4.jpg'
];

function MissionNew() {
  return (
    <Container fluid className="game-card-container">
      <Row className="justify-content-center">
        {gameImages.map((image, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index} className="b-game-card">
            <div
              className="b-game-card__cover"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MissionNew;