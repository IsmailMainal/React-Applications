// Import React and useState hook from React
import React, { useState } from "react";
import "./Login.css";


// Login component
const Login = () => {

  // State to store email input value
  const [email, setEmail] = useState("");

  // State to store password input value
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Display entered email and password (for testing)
    alert(`Email: ${email}\nPassword: ${password}`);

    // TODO: API call for login will be added here later
  };

  return (
    // Main container for centering the login form
    <div className="login-container">

      {/* Login form */}
      <form className="login-form" onSubmit={handleSubmit}>

        {/* Form heading */}
        <h2>Login</h2>

        {/* Email input field */}
        <input
          type="email"                 // Input type email
          placeholder="Enter Email"    // Placeholder text
          value={email}                // Bind input value to email state
          onChange={(e) => setEmail(e.target.value)} // Update email state on change
          required                     // Field is mandatory
        />

        {/* Password input field */}
        <input
          type="password"              // Input type password
          placeholder="Enter Password" // Placeholder text
          value={password}             // Bind input value to password state
          onChange={(e) => setPassword(e.target.value)} // Update password state
          required                     // Field is mandatory
        />

        {/* Submit button */}
        <button type="submit">
          Login
        </button>

      </form>
    </div>
  );
};

// Export Login component so it can be used in App.js
export default Login;
