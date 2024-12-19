import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, updatePassword } from '../api/auth';
import { message } from 'antd';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [api, contextHolder] = message.useMessage();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      if (response === "Password reset instructions have been sent if the email exists.") {
        api.success("Email found. Proceed to reset your password.");
        setStep(2);
      } else {
        api.error("This email is not registered in our system.");
      }
    } catch (err) {
      console.error("Error:", err.message);
      api.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      api.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await updatePassword(email, newPassword);
      if (response === "Password has been successfully updated.") {
        api.success("Your password has been successfully updated. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        api.error("Password update failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err.message);
      api.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      {contextHolder}
      <h2 style={{ textAlign: "center" }}>{step === 1 ? "Forgot Password" : "Update Password"}</h2>
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
            disabled={loading}
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
            disabled={loading}
          >
            Update Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
