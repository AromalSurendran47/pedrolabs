import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { BsCartPlus } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Product.css";
import axios from "axios";
import Preloader from "../../Components/Preloader/Preloader";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";

function Product() {
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({}); // Track added quantities
  const [userName, setUserName] = useState(""); // userName state
  const baseURL = "http://localhost:3001";

  const navigate = useNavigate();

  //

  useEffect(() => {
    // Retrieve the user's name from session storage
    const name = sessionStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart)); //  Load cart from storage
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userName"); // Clear session storage
    sessionStorage.removeItem("token"); // Remove token
    localStorage.removeItem("cart"); // Clear cart from localStorage
    setUserName(""); // Reset the userName state
    setCart({}); // Reset cart state in React
    window.location.href = "/authnew"; // Redirect to login page
  };
  

  // Fetch products
  const fetchProducts = () => {
    axios
      .get(`${baseURL}/getproducts`)
      .then((response) => {
        setProducts(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  // Initial product data Fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  // loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  const handleIncrement = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1,
    }));
  };

  // const handleAddToCart = (product) => {
  //   const quantity = quantities[product.id] || 1;
  
  //   setCart((prev) => {
  //     const updatedCart = {
  //       ...prev,
  //       [product.id]: {
  //         ...product,
  //         quantity: (prev[product.id]?.quantity || 0) + quantity,
  //       },
  //     };
  
  //     localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save entire product details
  //     return updatedCart;
  //   });
  
  //   alert(`${quantity} ${product.name}(s) added to the cart!`);
  // };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const token = sessionStorage.getItem("token");
  
    console.log("Adding to cart:", { productId: product.id, quantity, token });
  
    axios
      .post(
        `${baseURL}/addtocart`,
        { productId: product.id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        alert(`${quantity} ${product.name}(s) added to the cart!`);
        console.log("Cart updated:", response.data);
  
        setCart((prev) => {
          const updatedCart = {
            ...prev,
            [product.id]: {
              ...product,
              quantity: (prev[product.id]?.quantity || 0) + quantity,
            },
          };
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        });
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
  
        if (error.response) {
          console.error("Response Data:", error.response.data);
        }
  
        if (error.response && error.response.status === 401) {
          alert("Session expired. Please log in again.");
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = "/authnew";
        }
      });
  };
  
  
  

  // Calculate total items in cart
  const totalItemsInCart = Object.values(cart).reduce(
    (sum, qty) => sum + qty,
    0
  );

  return (
    <div className="product-page container ">
      <Header userName={userName} handleLogout={handleLogout} cart={cart} />

      <Row xs={1} sm={2} md={3}>
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="product-card mb-4 shadow-sm">
              <Card.Img
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: "pointer" }} // Add pointer cursor
                variant="top"
                src={`${baseURL}/uploads/${product.image}`}
                alt={product.name}
                height={200}
              />
              <Card.Body>
                <Card.Title className="product-name">{product.name}</Card.Title>
                <Card.Text className="product-description">
                  {product.details}
                </Card.Text>
                <Card.Text>
                  <span className="original-price text-muted text-decoration-line-through">
                    ₹{product.originalprice}
                  </span>{" "}
                  &nbsp;
                  <span className="offer-price text-danger fw-bold">
                    ₹{product.offerprice}
                  </span>
                </Card.Text>
                <div className="quantity-control mb-3">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleDecrement(product.id)}
                  >
                    -
                  </Button>
                  <span className="quantity-value mx-2">
                    {quantities[product.id] || 1}
                  </span>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleIncrement(product.id)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="success"
                  onClick={() => handleAddToCart(product)}
                  className="d-flex align-items-center justify-content-center pl-5 pr-5"
                >
                  <BsCartPlus size={20} className="me-2" />
                  <p
                    style={{
                      fontSize: "12px",
                      margin: 0, // Remove default paragraph margins
                      whiteSpace: "nowrap", // Prevent text wrapping to a new line
                    }}
                  >
                    Add to Cart
                  </p>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Product;
