import React from "react";
import "./Brand.css";

function Brand() {
  const sectionStyle = {
    padding: "20px 0",
    overflow: "hidden",
  };

  const marqueeStyle = {
    display: "flex",
    alignItems: "center",
    animation: "marquee 5s linear infinite", // Set the animation for smooth horizontal scrolling
  };

  const clientLogoStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "150px",
    padding: "10px",
  };

  const imgStyle = {
    maxWidth: "80px",
    transition: "0.3s",
    opacity: 0.8,
    //  filter: "grayscale(100%)",
  };

  const imgHoverStyle = {
    filter: "none",
    opacity: 1,
    transform: "scale(1.1)",
  };

  const clients = [
    { id: 1, src: "./brand/download.jfif" },
    { id: 2, src: "./brand/download.png", alt: "Client 2" },
    { id: 3, src: "./brand/download (1).png", alt: "Client 3" },
    { id: 4, src: "./brand/download (1).jfif", alt: "Client 4" },
    { id: 5, src: "./brand/download (2).png", alt: "Client 5" },
    { id: 6, src: "./brand/download (3).png", alt: "Client 6" },
  ];

  return (
    <section id="clients" style={sectionStyle} >
      <div
        className="marquee"
        style={marqueeStyle}
        data-aos="fade-up"
      >
        {/* Duplicate the array so it scrolls seamlessly */}
        {clients.concat(clients).map((client) => (
          <div key={client.id} style={clientLogoStyle}>
            <img
              src={client.src}
              alt={client.alt}
              style={imgStyle}
              onMouseOver={(e) => Object.assign(e.target.style, imgHoverStyle)}
              onMouseOut={(e) => Object.assign(e.target.style, imgStyle)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Brand;
