import React, { useState } from "react";
import "../components/static/forger.css";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState("requestCode"); // Initial step

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const navigate = useNavigate();
  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === "requestCode") {
      // Send a POST request to your Django backend to initiate the password reset
      try {
        const response = await fetch("http://localhost:8000/forget_password/api/send-reset-code/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          setStep("verifyCode"); // Move to the next step
          setMessage(`A reset code has been sent to ${email}`);
        } else {
          const data = await response.json();
          setMessage(data.error || "An error occurred.");
        }
      } catch (error) {
        console.error("Error sending reset code:", error);
        setMessage("An error occurred.");
      }
    } else if (step === "verifyCode") {
      // Send a POST request to your Django backend to verify the code
      try {
        const response = await fetch("http://localhost:8000/forget_password/api/verify-reset-code/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code: verificationCode }),
        });

        if (response.ok) {
          setStep("resetPassword"); // Move to the next step
          setMessage("Code verified successfully. You can now reset your password.");
        } else {
          const data = await response.json();
          setMessage(data.error || "An error occurred.");
        }
      } catch (error) {
        console.error("Error verifying code:", error);
        setMessage("An error occurred.");
      }
    } else if (step === "resetPassword") {
      try {
        const response = await fetch("http://localhost:8000/forget_password/api/reset-password/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newPassword }),
        });
  
        if (response.ok) {
          setMessage("Password updated successfully.");
          navigate("/login")
          // You can add logic to redirect the user to the login page here
        } else {
          const data = await response.json();
          setMessage(data.error || "An error occurred.");
        }
      } catch (error) {
        console.error("Error updating password:", error);
        setMessage("An error occurred.");
      }
    // Implement logic to reset the password with the new password
      // You can send another POST request to your Django backend for this step
      // After successful password reset, you can redirect the user to the login page
      // and show a success message
   
    }
  };

return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>
      {message && <p className="message" style={{ color: 'blue' }}>{message}</p>}
      {step === "requestCode" && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit">Request Code</button>
        </form>
      )}
      {step === "verifyCode" && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="verificationCode">Verification Code:</label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              placeholder="Verification Code"
              onChange={handleVerificationCodeChange}
              required
            />
          </div>
          <button type="submit">Verify Code</button>
        </form>
      )}
      {step === "resetPassword" && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
      {step === "resetPassword" ? (
        <div className="login-link">
          <Link to="/Login">Back to Login</Link>
        </div>
      ) : null}
    </div>
  );
};

export default ForgotPassword;
