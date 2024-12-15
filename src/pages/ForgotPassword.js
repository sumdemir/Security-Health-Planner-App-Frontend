import React, { useState } from "react";
import { forgotPassword } from '../api/auth';

const ForgotPassword = () => {
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [error, setError] = useState("");
  
// const handleSubmit = async (e) => {
// e.preventDefault();
// setMessage("");
// setError("");
  
// try {
// const response = await forgotPassword(email);
//  setMessage(response);
// } catch (err) {
// }
//  }; 

const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
  
    try {
      const response = await forgotPassword(email);
      if (response.success) {
        setMessage("Please check your email for instructions to reset your password.");
      } else {
        setError("Forgot password failed");
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError("An unexpected error occurred. Please try again later.");
    }
};
  
  
    return (
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </form>
        {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    );

  };
  
  
  export default ForgotPassword;
  