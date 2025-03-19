// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./SignUp.css";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agree: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     alert("Signup Successful!");
//     navigate("/login");
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <h1>Sign up</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label>Username</label>
//             <input
//               type="text"
//               name="username"
//               placeholder="Your Name"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Your Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Repeat your password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="checkbox-group">
//             <input
//               type="checkbox"
//               name="agree"
//               checked={formData.agree}
//               onChange={handleChange}
//               required
//             />
//             <label>
//               I agree to the <a href="#">Terms of Service</a>
//             </label>
//           </div>

//           <button type="submit">Register</button>

//           <p>
//             Already a member?{" "}
//             <span className="login-link" onClick={() => navigate("/login")}>
//               Login
//             </span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrorMessages({ ...errorMessages, [name]: "" }); // Clear error when user starts typing
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.username.trim()) {
      errors.username = "Please provide a valid Username";
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      errors.email = "Please enter a valid email address";
    }
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agree) {
      errors.agree = "You must agree to the terms";
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Signup Successful!");
      navigate("/login");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              value={formData.username}
              onChange={handleChange}
            />
            {errorMessages.username && <p className="error">{errorMessages.username}</p>}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errorMessages.email && <p className="error">{errorMessages.email}</p>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errorMessages.password && <p className="error">{errorMessages.password}</p>}
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errorMessages.confirmPassword && <p className="error">{errorMessages.confirmPassword}</p>}
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <label>
              I agree to the <a href="#">Terms of Service</a>
            </label>
            {errorMessages.agree && <p className="error">{errorMessages.agree}</p>}
          </div>

          <button type="submit">Register</button>

          <p>
            Already a member?{" "}
            <span className="login-link" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
