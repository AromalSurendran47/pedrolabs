import React from "react";
import Header from "../header/Header";

function Failure() {
  const sectionStyle = {
    padding: "20px 0",
    overflow: "hidden", 
  };

  const marqueeStyle = {
    display: "flex",
    alignItems: "center",
    animation: "marquee 15s linear infinite", 
  };

  const clientLogoStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "150px", 
    padding: "10px",
  };

  const imgStyle = {
    maxWidth: "100px",
    transition: "0.3s",
    opacity: 0.8,
    filter: "grayscale(100%)",
  };

  const imgHoverStyle = {
    filter: "none",
    opacity: 1,
    transform: "scale(1.1)",
  };

  const clients = [
    { id: 1, src: "../style/img/resp/wh.png", alt: "Client 1" },
    { id: 2, src: "../style/img/resp/wh.png", alt: "Client 2" },
    { id: 3, src: "../style/img/resp/wh.png", alt: "Client 3" },
    { id: 4, src: "../style/img/resp/wh.png", alt: "Client 4" },
    { id: 5, src: "../style/img/resp/wh.png", alt: "Client 5" },
    { id: 6, src: "../style/img/resp/wh.png", alt: "Client 6" },
  ];

  return (
    <>
      <Header />

      <section id="clients" style={sectionStyle}>
        <div
          className="marquee"
          style={marqueeStyle}
          data-aos="fade-up"
        >
          {clients.concat(clients).map((client) => (
            
            <div key={client.id + Math.random()} style={clientLogoStyle}>
              <img
                src={client.src}
                alt={client.alt}
                style={imgStyle}
                onMouseOver={(e) =>
                  Object.assign(e.target.style, imgHoverStyle)
                }
                onMouseOut={(e) => Object.assign(e.target.style, imgStyle)}
              />
            </div>
          ))}
        </div>
      </section>


      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </>
  );
}

export default Failure;






// Trusted Expertise: At Pedro, we are committed to providing high-quality medicines and medical devices backed by years of experience in the healthcare industry. Our team ensures that every product is sourced from trusted manufacturers and complies with the highest safety and quality standards.

// Wide Range of Products: We offer an extensive catalog of medical products, including prescription medications, over-the-counter remedies, and essential medical devices. Whether you're a healthcare professional or an individual seeking reliable solutions, Pedro has everything you need for health and wellness.

// Convenience and Accessibility: Shopping for medicines and medical devices can be time-consuming and overwhelming. At Pedro, we make it simple and convenient. With our easy-to-navigate website, secure payment options, and fast delivery services, your health needs are just a few clicks away.

// Affordable Prices: We understand the importance of affordability when it comes to healthcare. That's why we strive to offer competitive prices on all our products, without compromising on quality. You can trust Pedro for both cost-effective and top-tier healthcare solutions.

// Customer-Centered Service: At Pedro, our customers are our priority. We pride ourselves on providing exceptional customer service, ensuring your experience is smooth from start to finish. Whether you need product recommendations, support with orders, or help understanding medical devices, our team is here for you every step of the way.

// Safe and Secure Shopping: When it comes to healthcare, safety is paramount. Our website is designed with the latest security features to ensure your personal information and transactions are protected. We also comply with all regulatory requirements to give you peace of mind when shopping for medical products.

// Commitment to Health and Well-being: Pedro isn't just about selling products; we’re passionate about improving lives. We offer a range of health resources, guides, and expert advice to support you in making informed decisions about your health and wellness.




  // https://codepen.io/kathykato/pen/MoZJom




  // strength

  useEffect(() => {
    const animateCounters = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = document.querySelectorAll('.timer');
          counters.forEach(counter => {
            const updateCount = () => {
              const target = +counter.getAttribute('data-target');
              const count = +counter.innerText;

              const speed = 200; 
              const increment = target / speed;

              if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 30);
              } else {
                counter.innerText = target;
              }
            };

            updateCount();
          });
          observer.disconnect();
        }
      });
    };

    const observer = new IntersectionObserver(animateCounters, {
      threshold: 0.5
    });

    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
      observer.observe(counterSection);
    }

    return () => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    };
  }, []);
  
  
  
  
  
      <section id="counter" className="counter-section content-section">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12">
              <h2 className="white">Our Strength</h2>
            </div>

             <div className="col-sm-3 counter-wrap">
              <strong>
                <span className="timer" data-target="100000">0</span>+
              </strong>
              <span className="count-description">TEST</span>
            </div>

            <div className="col-sm-3 counter-wrap">
              <strong>
                <span className="timer" data-target="3000">0</span>+
              </strong>
              <span className="count-description">TEST</span>
            </div>

            <div className="col-sm-3 counter-wrap">
              <strong>
                <span className="timer" data-target="7000">0</span>+
              </strong>
              <span className="count-description">TEST</span>
            </div>

            <div className="col-sm-3 counter-wrap">
              <strong>
                <span className="timer" data-target="25000">0</span>+
              </strong>
              <span className="count-description">TEST</span>
            </div>
          </div>
        </div>
      </section>



// https://themewagon.com/themes/free-responsive-bootstrap-5-gardening-website-template-gardener/

 const Preloader = () => {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // Adjust time for the loader as needed
  
      return () => clearTimeout(timer);
    }, []);

    if(loading){
      return <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    }}












// --------------------------------------------------------------------------------------------------
    // edit register data


app.put("/update/:id", (req, res) => {
  const userId = req.params.id;
  const { fname, lname, email } = req.body;

  console.log(req.body);

  // Validate that all fields are provided
  if (!fname || !lname || !email ) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  // SQL query to update user details
  const sql = `
  UPDATE register
  SET fname = ?, lname = ?, email = ?
  WHERE id = ?
`;

  pool.query(sql, [fname, lname, email, id], (err, result) => {
    if (err) {
      console.error("Error updating the database:", err);
      return res.status(500).json({ success: false, message: "Database error." }); // Ensure to return after sending the response
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "No user found with the given ID.",
      });
    }

    // Only send a response once
    res.status(200).json({
      success: true,
      message: "User details updated successfully.",
    });
  });
});


// ---------------------------------------------------------------------------------------------



const handleSave = () => {
  if (selectedUser) {
    axios
      .put(`${baseURL}/update/${selectedUser.id}`, selectedUser)
      .then((response) => {
        console.log("Update Response:", response.data);
        registeredUsers(); // Refresh user list
        handleCloseModal(); // Close modal
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  }
};