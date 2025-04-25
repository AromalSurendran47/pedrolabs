import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import Preloader from "../../Components/Preloader/Preloader";
import "./SingleProduct.css";
import Header from "../../Components/Header";

function SingleProduct() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [userName, setUserName] = useState("");
  const [cart, setCart] = useState({});

  const baseURL = "http://35.154.208.64:3001";

  useEffect(() => {
    const name = sessionStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`${baseURL}/getproduct/${id}`);
          if (response.data) {
            setProduct(response.data);
          } else {
            setError("Product not found");
          }
        } catch (err) {
          console.error("Error fetching product details:", err);
          setError("Failed to load product");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }, 2000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("cart");
    setUserName("");
    setCart({});
    window.location.href = "/authnew";
  };

  // Increment & Decrement Functions
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const handleAddToCart = () => {
    if (!product) return;

    const updatedCart = {
      ...cart,
      [product.id]: (cart[product.id] || 0) + quantity,
    };

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert(`${quantity} ${product.name}(s) added to the cart!`);
  };

  if (loading) return <Preloader />;
  if (error) return <h3 className="text-center text-danger">{error}</h3>;

  return (
    <div>
      <Header userName={userName} handleLogout={handleLogout} cart={cart} />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100"
      >
        <Row className="justify-content-center w-100">
          <Col md={8} lg={6}>
            <Card className="p-4 shadow-lg rounded">
              <Row className="align-items-center">
                <Col md={6} className="text-center">
                  {product?.image ? (
                    <Card.Img
                      src={`${baseURL}/uploads/${product.image}`}
                      alt={product.name}
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                  ) : (
                    <p className="text-muted">No Image Available</p>
                  )}
                </Col>
                <Col md={6}>
                  <h2 className="fw-bold">{product.name}</h2>
                  <p className="text-muted">{product.details}</p>
                  <h4>
                    <span className="text-danger fw-bold">
                      ₹{product.offerprice}
                    </span>{" "}
                    <del className="text-muted">₹{product.originalprice}</del>
                  </h4>

                  <div className="d-flex align-items-center mt-3">
                    <Button
                      variant="outline-secondary"
                      onClick={handleDecrement}
                      className="d-flex justify-content-center"
                    >
                      -
                    </Button>
                    <Form.Control
                      type="number"
                      value={quantity}
                      readOnly
                      className="mx-2 text-center"
                      style={{ width: "50px", borderRadius: "5px" }}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={handleIncrement}
                      className="d-flex justify-content-center"
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    variant="success"
                    size="lg"
                    className="mt-3 w-100 d-flex justify-content-center"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SingleProduct;
