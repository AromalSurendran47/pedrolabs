import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Image,
  Form,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Cart.css";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const baseURL = "http://35.154.208.64:3001";

  // fetch products

  const fetchCartProducts = async () => {
    const token = sessionStorage.getItem("token");
  
    if (!token) {
      console.warn("No user token found, clearing cart.");
      setCartItems([]); // Clear cart items when no token is found
      return;
    }
  
    try {
      const response = await axios.get(`${baseURL}/getcart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.data.success) {
        setCartItems(response.data.cart);
        localStorage.setItem("cart", JSON.stringify(response.data.cart)); // Store latest cart data
      }
    } catch (error) {
      console.error("Error fetching cart from database:", error);
    }
  };
  
  
  useEffect(() => {
    fetchCartProducts();
  }, []);
  

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.offerprice * item.quantity,
      0
    );
  };

  const updateQuantity = async (id, change) => {
    const token = sessionStorage.getItem("token");
  
    try {
      const updatedCart = cartItems.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + change) }
          : product
      );
  
      // Update state immediately for smooth UI response
      setCartItems(updatedCart);
  
      // Send update request to backend
      await axios.put(
        `${baseURL}/updatecart`,
        { productId: id, quantity: change },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };
  
  

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
  
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart); // Retrieve and parse cart data
  
        if (parsedCart && typeof parsedCart === "object") {
          const cartArray = Object.values(parsedCart); // Convert object to array
          setCartItems(cartArray);
        }
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  }, []);
  

  const handleRemove = async (id) => {
    const token = sessionStorage.getItem("token");
  
    try {
      await axios.delete(`${baseURL}/removecart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const updatedCart = cartItems.filter((product) => product.id !== id);
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  
  

  return (
    <Container className="cart-container p-4 shadow-lg rounded">
      <h2 className="cart-title text-center mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart text-center">Your cart is empty.</p>
      ) : (
        <Table
          responsive
          striped
          bordered
          hover
          className="cart-table text-center"
        >
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((product) => (
              <tr key={product.id}>
                <td className="cart-item d-flex align-items-center gap-3">
                  <Image
                    src={`${baseURL}/uploads/${product.image}`}
                    alt={product.name}
                    className="cart-image rounded"
                  />
                  <span>{product.name}</span>
                </td>
                <td>₹{product.offerprice}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => updateQuantity(product.id, -1)}
                    
                  >
                    -
                  </Button>
                  <span className="quantity mx-2">{product.quantity}</span>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => updateQuantity(product.id, 1)}
                  >
                    +
                  </Button>
                </td>
                <td>₹{product.offerprice * product.quantity}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemove(product.id)}
                    style={{paddingRight:'65px'}}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div className="cart-total text-center my-4">
        <h4>Total: ₹{getTotal()}</h4>
      </div>
      <div className="payment-section p-4 shadow-sm rounded bg-light">
        <h3 className="text-center mb-3">Payment Details</h3>
        <Form>
          <Form.Group className="mb-3" controlId="cardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="text" placeholder="Enter card number" />
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="expiryDate">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control type="text" placeholder="MM/YY" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="cvv">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="text" placeholder="CVV" />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="cardName">
            <Form.Label>Cardholder Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name on card" />
          </Form.Group>
          <Button variant="success" className="w-100">
            Proceed to Payment
          </Button>
        </Form>
      </div>
      {/* <div className="similar-products-section mt-5 p-4 shadow-sm rounded bg-light">
        <h3 className="text-center mb-3">Similar Products</h3>
        <Row className="g-4">
          {similarProducts.map((product, index) => (
            <Col key={index} md={4}>
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={`${baseURL}/uploads/${product.image}`}
                  alt={product.name}
                  className="p-3"
                />
                <Card.Body className="text-center">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>₹{product.price}</Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div> */}
    </Container>
  );
}

export default Cart;
