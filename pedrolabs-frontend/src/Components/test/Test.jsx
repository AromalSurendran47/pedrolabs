import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaUpload } from "react-icons/fa"; // For file upload icon

function Test() {
  const [name, setProductName] = useState("");
  const [details, setDetails] = useState("");
  const [originalprice, setOriginalPrice] = useState("");
  const [offerprice, setOfferPrice] = useState("");
  const [image, setImage] = useState(null);
  const [productStatus, setProductStatus] = useState("");

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("details", details);
      formData.append("originalprice", originalprice);
      formData.append("offerprice", (offerprice * originalprice) / 100);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:3001/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Ensure token is included
          },
        }
      );

      setProductStatus(response.data.message);
      setTimeout(() => {
        window.location.href = "/product";
      }, 2000);
    } catch (error) {
      setProductStatus("Failed to add product. Please try again.");
    }
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            <div className="card shadow-lg rounded-3">
              <div className="card-body p-4 p-md-5">
                <h2 className="text-center text-primary mb-4 fw-bold">
                  Add New Product
                </h2>
                <form
                  onSubmit={handleProductSubmit}
                  encType="multipart/form-data"
                >
                  <div className="form-group mb-4">
                    <label className="form-label text-muted">
                      Product Name
                    </label>
                    <input
                      className="form-control form-control-lg rounded-3"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label text-muted">Details</label>
                    <input
                      className="form-control form-control-lg rounded-3"
                      type="text"
                      name="details"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label text-muted">
                      Original Price
                    </label>
                    <input
                      className="form-control form-control-lg rounded-3"
                      type="number"
                      name="originalprice"
                      value={originalprice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label text-muted">Offer %</label>
                    <input
                      className="form-control form-control-lg rounded-3"
                      type="number"
                      name="offerprice"
                      value={offerprice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label text-muted">
                      Upload Image
                    </label>
                    <div className="input-group">
                      <input
                        type="file"
                        name="image"
                        onChange={handleImageUpload}
                        className="form-control form-control-lg rounded-3"
                      />
                      <button
                        className="btn btn-outline-secondary rounded-3"
                        type="button"
                      >
                        <FaUpload />
                      </button>
                    </div>
                    {image && (
                      <div className="mt-2">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Selected"
                          style={{
                            width: "100px",
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg rounded-3 shadow-sm w-100"
                    >
                      Add New Product
                    </button>
                  </div>

                  {productStatus && (
                    <div className="mt-3 text-center">
                      <p className="text-muted" style={{ fontSize: "14px" }}>
                        {productStatus}
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Test;
