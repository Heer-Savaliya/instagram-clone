import React, { useState } from "react";
import { auth, firestore } from "../firebaseConfig";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [serverOtp, setServerOtp] = useState(null);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 minutes

    await setDoc(doc(firestore, "passwordResets", email), {
      otp,
      expiresAt: expiry,
    });

    alert(`OTP : ${otp}`);
    toast.success("OTP sent to your email (console.log for now)");
    setServerOtp(otp);
    setOtpSent(true);
  };

  const handleVerifyOtp = async () => {
    const docSnap = await getDoc(doc(firestore, "passwordResets", email));
    if (!docSnap.exists()) return toast.error("No OTP found");

    const data = docSnap.data();
    const now = new Date();

    if (now > data.expiresAt.toDate()) {
      return toast.error("OTP expired. Try again.");
    }

    if (data.otp === enteredOtp) {
      await sendPasswordResetEmail(auth, email);
      toast.success("Verified! Password reset email sent.");
      navigate("/login");
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Send OTP
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 border rounded mb-4 mt-4"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white p-2 rounded"
            >
              Verify OTP & Send Reset Link
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
