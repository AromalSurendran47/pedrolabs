import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import Preloader from "../../Components/Preloader/Preloader";
import Header from "../../Components/Header";

function Dashboard() {
  const baseURL = "http://localhost:3001";

  // State Management
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("user"); // New state to manage active tab
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [registerStatus, setRegisterStatus] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [photo, setPhoto] = useState("");
  const [originalprice, setOriginalprice] = useState("");
  const [offerprice, setOfferprice] = useState("");

  const [userName, setUserName] = useState("");
  const [cart, setCart] = useState({}); // Track added quantities

  // loading
  const [loading, setLoading] = useState(true);

  // Fetch Registered Users
  const fetchRegisteredUsers = () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.error("No token found, please login first.");
      return;
    }

    axios
      .get(`${baseURL}/getusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        if (error.response && error.response.status === 401) {
          alert("Unauthorized access. Please log in again.");
          sessionStorage.removeItem("token");
          window.location.href = "/login";
        }
      });
  };

  // Fetch Products
  const fetchProducts = () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.error("No token found, please login first.");
      return;
    }

    axios
      .get(`${baseURL}/getproducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  // User Actions
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token is missing.");
        return;
      }

      axios
        .put(`${baseURL}/update/${selectedUser.id}`, selectedUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            fetchRegisteredUsers();
            setShowModal(false);
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          alert("Failed to update user. Please try again.");
        });
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token is missing.");
        return;
      }

      axios
        .delete(`${baseURL}/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          fetchRegisteredUsers();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    if (!name || !details || !originalprice || !offerprice) {
      setRegisterStatus("Please fill out all fields.");
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found, please login first.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("details", details);
    formData.append("originalprice", originalprice);
    formData.append("offerprice", (offerprice * originalprice) / 100);
    if (photo) {
      formData.append("image", photo); // Append the image file if updated
    }

    // Debug: Log formData contents
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.put(
        `${baseURL}/updateproduct/${selectedProduct.id}`, // Ensure correct API route
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setRegisterStatus("Product updated successfully.");
        setShowProductModal(false);
        fetchProducts();
      } else {
        setRegisterStatus(response.data.message);
      }
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error);
      setRegisterStatus("An error occurred. Please try again later.");
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token is missing.");
        return;
      }

      axios
        .delete(`${baseURL}/deleteproduct/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          fetchProducts();
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setName(product.name);
    setDetails(product.details);
    setPhoto(null); // Reset image selection
    setOriginalprice(product.originalprice);
    setOfferprice(product.offerprice);
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setName("");
    setDetails("");
    setPhoto("");
    setOriginalprice("");
    setOfferprice("");
  };

  const handleCloseUserModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

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
    sessionStorage.clear();
    sessionStorage.removeItem("userName"); // Clear session storage
    localStorage.removeItem("cart"); //  Clear cart from localStorage
    setUserName(""); // Reset the userName state
    setCart({}); //  Reset cart state in React
    window.location.href = "/authnew"; // Redirect to login page
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Initial Data Fetch
    const token = sessionStorage.getItem("token");
    if (token) {
      fetchRegisteredUsers();
      fetchProducts(); // Fetch products as well
    }

    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div>
      <Header userName={userName} handleLogout={handleLogout} cart={cart} />
      <Container className="dashboard-container" style={{ marginTop: "120px" }}>
        <h2 className="text-center my-4">Admin Dashboard</h2>

        {/* Tab buttons */}
        <div className="text-center mb-3">
          <Button
            variant={activeTab === "user" ? "primary" : "secondary"}
            onClick={() => setActiveTab("user")}
            className="me-2 "
            style={{ paddingRight: "58px" }}
          >
            Users
          </Button>
          <Button
            variant={activeTab === "product" ? "primary" : "secondary"}
            onClick={() => setActiveTab("product")}
            style={{ paddingRight: "80px" }}
          >
            Products
          </Button>
        </div>

        {/* User or Product Table */}
        {activeTab === "user" ? (
          <>
            <div
              className="text-end mb-3"
              style={{ display: "flex", gap: "10px" }}
            >
              <Button
                variant="success"
                onClick={() => (window.location.href = "./test")} // Add product button should still be present in user tab
                style={{
                  fontSize: "11px",
                  padding: "10px 40px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                Add Product
              </Button>
            </div>

            <Table striped bordered hover responsive className="text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.fname}</td>
                    <td>{user.lname}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className="d-flex justify-content-center">
                      <Button
                        variant="warning"
                        className="me-2 pr-5"
                        onClick={() => handleEditUser(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteUser(user.id)}
                        className="pr-5"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <>
            <div
              className="text-end mb-3"
              style={{ display: "flex", gap: "10px" }}
            >
              <Button
                variant="success"
                onClick={() => (window.location.href = "./test")} // Add product button should still be present in user tab
                style={{
                  fontSize: "11px",
                  padding: "10px 40px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                Add Product
              </Button>
            </div>

            <Table striped bordered hover responsive className="text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Details</th>
                  <th>Photo</th>
                  <th>Original Price</th>
                  <th>Offer Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.details}</td>
                    <td>
                      <img
                        src={`${baseURL}/uploads/${product.image}`}
                        alt={product.name}
                        width="50"
                      />
                    </td>
                    <td>{product.originalprice}</td>
                    <td>{product.offerprice}</td>
                    <td className="d-flex justify-content-center">
                      <Button
                        variant="warning"
                        className="me-2 pr-5"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="pr-5"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}

        {/* Edit User Modal */}
        <Modal show={showModal} onHide={handleCloseUserModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <Form>
                <Form.Group controlId="formFname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={selectedUser.fname}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        fname: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="formLname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={selectedUser.lname}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        lname: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        email: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseUserModal}
              className="pr-5"
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveUser} className="pr-5">
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Product Modal */}
        <Modal show={showProductModal} onHide={handleCloseProductModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSaveProduct}>
              <Form.Group controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formProductDetails">
                <Form.Label>Details</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter product details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formProductPhoto">
                <Form.Label>Upload New Image (Optional)</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                {selectedProduct?.image && (
                  <img
                    src={`${baseURL}/uploads/${selectedProduct.image}`}
                    alt="Current"
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                )}
              </Form.Group>

              <Form.Group controlId="formOriginalPrice">
                <Form.Label>Original Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter original price"
                  value={originalprice}
                  onChange={(e) => setOriginalprice(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formOfferPrice">
                <Form.Label>Offer %</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter offer price"
                  value={offerprice}
                  onChange={(e) => setOfferprice(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseProductModal}
              className="pr-5"
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveProduct}
              className="pr-5"
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Dashboard;
