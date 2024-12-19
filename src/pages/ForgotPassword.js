import React, { useState } from "react";
import { forgotPassword, resetPassword, updatePassword } from '../api/auth';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await forgotPassword(email);

      if (response === "Password reset instructions have been sent if the email exists.") {
        setMessage("Email found. Proceed to reset your password.");
        setStep(2); // Şifre yenileme adımına geç
      } else {
        setError("This email is not registered in our system.");
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await updatePassword(email, newPassword);
      if (response === "Password has been successfully updated.") {
        setMessage("Your password has been successfully updated.");
        setStep(1); // İşlem tamamlandı, ilk adıma dön
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError("Password update failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>{step === 1 ? "Forgot Password" : "Update Password"}</h2>
      {step === 1 && (
        <form onSubmit={handleForgotPassword}>
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
      )}
      {step === 2 && (
        <form onSubmit={handleUpdatePassword}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Update Password
          </button>
        </form>
      )}
      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;