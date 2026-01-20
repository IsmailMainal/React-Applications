import React, { useEffect, useState } from "react"; // React and hooks
import axios from "axios"; // Axios for HTTP requests
import { toast } from "react-toastify"; // Toast notifications

const Cart = () => {
  // State to store cart items
  const [cart, setCart] = useState([]);

  // Function to fetch cart data from backend
  const loadCart = () => {
    axios
      .get("http://localhost:3000/api/cart") // GET API request to fetch cart items
      .then((res) => setCart(res.data)) // Store response data in state
      .catch(() => toast.error("Failed to load cart")); // Show toast on error
  };

  // useEffect runs once when component mounts
  useEffect(() => {
    loadCart(); // Load cart items when page loads
  }, []);

  // Increase quantity of a cart item
  const increaseQty = (id, qty) => {
    axios
      .put(`http://localhost:3000/api/cart/${id}`, { quantity: qty + 1 }) // PUT request to update quantity
      .then(() => loadCart()); // Reload cart after updating
  };

  // Decrease quantity of a cart item
  const decreaseQty = (id, qty) => {
    if (qty === 1) return; // Prevent quantity going below 1
    axios
      .put(`http://localhost:3000/api/cart/${id}`, { quantity: qty - 1 }) // PUT request to update quantity
      .then(() => loadCart()); // Reload cart after updating
  };

  // Remove item from cart
  const removeItem = (id) => {
    if (window.confirm("Remove item from cart?")) { // Confirm before deleting
      axios
        .delete(`http://localhost:3000/api/cart/${id}`) // DELETE request to remove item
        .then(() => {
          toast.success("Item removed"); // Show success toast
          loadCart(); // Reload cart after deletion
        });
    }
  };

  // Calculate total price of all items in the cart
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ marginTop: "120px", padding: "20px" }}>
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? ( // If cart is empty
        <h3>Your cart is empty</h3>
      ) : ( // If cart has items
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th> {/* Item name */}
              <th>Price</th> {/* Single item price */}
              <th>Qty</th> {/* Quantity controls */}
              <th>Total</th> {/* Total price for that item */}
              <th>Action</th> {/* Remove button */}
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => ( // Loop through cart items
              <tr key={item.id}>
                <td>{item.name}</td> {/* Display item name */}
                <td>₹{item.price}</td> {/* Display item price */}
                <td>
                  <button onClick={() => decreaseQty(item.id, item.quantity)}>
                    -
                  </button> {/* Decrease quantity button */}
                  {item.quantity} {/* Display current quantity */}
                  <button onClick={() => increaseQty(item.id, item.quantity)}>
                    +
                  </button> {/* Increase quantity button */}
                </td>
                <td>₹{item.price * item.quantity}</td> {/* Total price for this item */}
                <td>
                  <button
                    className="btn btn-delete"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button> {/* Remove item button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Grand Total: ₹{total}</h3> {/* Display total price of all items */}
    </div>
  );
};

export default Cart;
