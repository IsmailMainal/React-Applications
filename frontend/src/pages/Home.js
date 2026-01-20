import React, { useState, useEffect } from "react"; // Import React and hooks for css
import { Link } from "react-router-dom"; // Import Link for navigation between pages
import "./Home.css"; // Import CSS for styling the component
import { toast } from "react-toastify"; // Import toast for showing notifications
import axios from "axios"; // Import axios for making HTTP requests

const Home = () => {
  // State to store the data fetched from backend
  const [data, setData] = useState([]);


  // Function to fetch data from the backend API
const loadData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/get");
    console.log("API response:", response.data);
    setData(response.data);
  } catch (error) {
    console.error("Fetch error:", error);
    toast.error("Failed to fetch data");
  }
};

const addToCart = (item) => {
  axios
    .post("http://localhost:3000/api/cart", {
      name: item.name,
      price: item.price,
      quantity: 1
    })
    .then(() => {
      toast.success("Item added to cart");
    })
    .catch((error) => {
      console.error(error);
      toast.error("Failed to add to cart");
    });
};




  // useEffect runs once when the component mounts
  useEffect(() => {
    loadData(); // Call function to load data on component mount
  }, []); // Empty dependency array ensures it runs only once

const deletequantity = (id) => {
  if (window.confirm("Are you sure you want to delete this quantity?")) {
    axios
      .delete(`http://localhost:3000/api/remove/${id}`) // ✅ fixed template string
      .then(() => {
        toast.success("quantity Deleted Successfully");
        loadData(); // ✅ reload data immediately
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete quantity");
      });
  }
};


  return (
    <div style={{ marginTop: "150px" }}>
      {/*Add Button*/}
      <Link to="/addquantity">
      <button className="btn btn-edit">Add items</button>
      </Link>
      <Link to="/cart">
      <button className="btn btn-edit">Cart</button>
      </Link>
      
      {/* Table to display fetched data */}
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>NO.</th> {/* Serial number */}
            <th style={{ textAlign: "center" }}>Name</th> {/* Nmae column */}
            <th style={{ textAlign: "center" }}>Price</th> {/* Price column */}
            <th style={{ textAlign: "center" }}>Quantity</th> {/* Quantity column */}
            <th style={{ textAlign: "center" }}>Action</th> {/* Actions column */}
          </tr>
        </thead>

        <tbody>
          {/* Loop through the data array and create a table row for each item */}
          {data.map((item, server) => (
            <tr key={item.id}>
              <th scope="row">{server + 1}</th> {/* Display serial number */}
              <td>{item.name}</td> {/* Display price */}
              <td>{item.price}</td> {/* Display price */}
              <td>{item.quantity}</td> {/* Display quantity */}


              <td>
                {/* Edit button navigates to the update page with item id */}
                <Link to={`/update/${item.id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>

               <button className="btn btn-edit" onClick={() => addToCart(item)}>Add to Cart</button>



                {/* Delete button (functionality not implemented yet) */}
                <button className="btn btn-delete" onClick={() => deletequantity(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home; // Export component to use in other parts of the app
