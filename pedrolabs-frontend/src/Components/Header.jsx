import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { MDBInput, MDBCol, MDBRow, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import "./Header.css";

function Header({ userName, handleLogout, cart }) {
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false); // Manage navbar expanded state

  const handleShow = () => {
    setShowModal(true);
    setIsNavbarExpanded(false); // Collapse the navbar when modal opens
  };
  const handleClose = () => setShowModal(false);

  const handleToggle = () => setIsNavbarExpanded(!isNavbarExpanded);
  const handleNavItemClick = () => setIsNavbarExpanded(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate total cart count
  const totalCartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div>
      <Navbar
        expand="lg"
        className={`header-container ${isScrolled ? "scrolled" : ""} fixed-top`}
        expanded={isNavbarExpanded} // Pass the expanded state
      >
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                src="/logo.png"
                alt="Logo"
                className="img-fluid"
                width={"60px"}
                onClick={handleNavItemClick} // Collapse navbar on click
              />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="navbarScroll"
            className="burgerMenu"
            onClick={handleToggle} // Toggle navbar state
          >
            <i className="fas fa-bars"></i>
          </Navbar.Toggle>

          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link
                to="/"
                className={`headerMenus ${
                  location.pathname === "/" ? "active" : ""
                }`}
                onClick={handleNavItemClick} // Close navbar on click
              >
                HOME
              </Link>
              <Link
                to="/about-us"
                className={`headerMenus ${
                  location.pathname === "/about-us" ? "active" : ""
                }`}
                onClick={handleNavItemClick} // Close navbar on click
              >
                ABOUT
              </Link>
              <Link
  to="/product"
  className={`headerMenus ${
    location.pathname === "/product" ? "active" : ""
  }`}
  onClick={handleNavItemClick}
>
  PRODUCTS
</Link>

              <Link
                to="/services"
                className={`headerMenus ${
                  location.pathname === "/services" ? "active" : ""
                }`}
                onClick={handleNavItemClick} // Close navbar on click
              >
                SERVICES
              </Link>


            </Nav>
            {/* <Form className="d-flex searchbar">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form> */}
            <div className="icon-div">
              <Link to="/dashboard">
                <i class="fa-solid fa-list-check"></i>
              </Link>
              <Link to="/cart">
                <i
                  className="fa-solid fa-cart-shopping"
                  onClick={handleNavItemClick}
                  style={{ position: "relative" }}
                >
                  {/* Cart Icon */}

                  <span
                    className="cart-count"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "5px 10px",
                      fontSize: "8px",
                      display: totalCartCount > 0 ? "inline-block" : "none", // Hide when empty
                    }}
                  >
                    {totalCartCount}
                  </span>
                </i>
              </Link>

              {userName ? (
                <button
                  style={{
                    fontSize: "16px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handleLogout}
                >
                  logout
                </button>
              ) : (
                <Link to="/authnew">
                  <i
                    className="fa-solid fa-user"
                    onClick={handleShow} // Collapse navbar when user icon is clicked
                    style={{ textDecoration: "none" }}
                  ></i>
                </Link>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </div>
  );
}

export default Header;
