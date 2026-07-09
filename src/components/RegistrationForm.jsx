import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registered successfully!\nUsername: ${formData.username}`);
    setFormData({ username: "", password: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration Form</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
