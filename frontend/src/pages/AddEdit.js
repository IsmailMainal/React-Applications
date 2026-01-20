import React, { useEffect, useState } from "react"; // Import React and hooks
import { useNavigate, Link, useParams } from "react-router-dom"; // Navigation and params
import { toast } from "react-toastify"; // Toast notifications
import "./AddEdit.css"; // Component CSS
import axios from "axios"; // HTTP requests

const AddEdit = () => {
  const navigate = useNavigate(); // Programmatic navigation
  const { id } = useParams(); // Get id from URL for editing

  // 🔹 State variables for form fields
  const [name, setName] = useState(""); 
  const [price, setprice] = useState(""); 
  const [quantity, setquantity] = useState(""); 

  // 🔹 Fetch data when editing (id exists)
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/api/get/${id}`) // GET request to fetch single item
        .then((resp) => {
          setName(resp.data[0].name); // Populate name field
          setprice(resp.data[0].price); // Populate price field
          setquantity(resp.data[0].quantity); // Populate quantity field
        })
        .catch((error) => console.error(error)); // Log error if fetch fails
    }
  }, [id]); // Run when id changes

  // 🔹 Handle input changes dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value); // Update name
    else if (name === "price") setprice(value); // Update price
    else if (name === "quantity") setquantity(value); // Update quantity
  };

  // 🔹 Handle form submission (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    const data = { name, price, quantity }; // Data object to send

    if (!id) {
      // ADD new item
      axios
        .post("http://localhost:3000/api/post", data) // POST request to add
        .then(() => {
          toast.success("quantity Added Successfully"); // Show success toast
          navigate("/"); // Redirect to Home
        })
        .catch((error) => {
          console.error(error); // Log error
          toast.error("Error adding quantity"); // Show error toast
        });
    } else {
      // UPDATE existing item
      axios
        .put(`http://localhost:3000/api/update/${id}`, data) // PUT request to update
        .then(() => {
          toast.success("quantity Updated Successfully"); // Show success toast
          navigate("/"); // Redirect to Home
        })
        .catch((error) => {
          console.error(error); // Log error
          toast.error("Error updating quantity"); // Show error toast
        });
    }
  };

  return (
    <div className="form-container"> {/* Form container */}
      <form className="form-card" onSubmit={handleSubmit}> {/* Form wrapper */}
        <h2>{id ? "Edit quantity" : "Add quantity"}</h2> {/* Conditional title */}

        {/* Name input field */}
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          required
        />

        {/* Price input field */}
        <label>price</label>
        <input
          type="price"
          name="price"
          value={price}
          onChange={handleInputChange}
          required
        />

        {/* Quantity input field */}
        <label>quantity</label>
        <input
          type="text"
          name="quantity"
          value={quantity}
          onChange={handleInputChange}
          required
        />

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit">{id ? "Update" : "Save"}</button> {/* Save / Update button */}

          {/* Cancel button navigates back to Home */}
          <Link to="/">
            <button type="button" className="btn-cancel">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddEdit;
