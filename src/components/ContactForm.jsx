import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Contact info submitted:\nName: ${formData.name}\nEmail: ${formData.email}\nContact: ${formData.contact}\nAddress: ${formData.address}`
    );
    setFormData({ name: "", email: "", contact: "", address: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Form</h2>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="contact"
        placeholder="Your Contact Number"
        value={formData.contact}
        onChange={handleChange}
      />
      <br />
      <textarea
        name="address"
        placeholder="Your Address"
        value={formData.address}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
