import React from "react";
import "./Mission.css"; // Ensure the CSS file is correctly linked
import { Container } from "react-bootstrap";

function Mission() {
  const cardsData = [
    {
      title: "Mission",
      imgUrl: "https://t4.ftcdn.net/jpg/00/96/54/53/360_F_96545306_cX6N4Fv2TTVRMKahA3aoCvxlUOGm2KkV.jpg",
      
    },
    {
      title: "Vision",
      imgUrl: "https://aerosofthealthcare.com/images/vision.png",
      
    },
  ];

  return (
    <div className="mission-wrapper mt-5">
      <Container>
        <h1 className="text-center my-4">Our Mission and Our Vision</h1>
        <div className="row justify-content-center">
          {cardsData.map((card, index) => (
            <div key={index} className="col-md-4 col-sm-6 col-12 my-3 ">
              <div className="card-container">
                <div className="card-inner">
                  <div
                    className="card-front"
                    style={{ backgroundImage: `url(${card.imgUrl})` }}
                  >
                    <div className="card-content">
                      <p>{card.title}</p>
                      <span>{card.description}</span>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="card-content">
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Alias cum repellat velit quae suscipit c.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Mission;
