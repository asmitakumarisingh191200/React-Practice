import { useState } from "react";

const Form2 = () => {

    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

   
    const validatePassword = (password) => {

        if (password.trim() === "") {
            return "Password is required";
        }

        if (password.length < 8) {
            return "Password should be at least 8 characters";
        }

        if (!/[A-Z]/.test(password)) {
            return "Password should contain one uppercase letter";
        }

        if (!/[a-z]/.test(password)) {
            return "Password should contain one lowercase letter";
        }

        if (!/[0-9]/.test(password)) {
            return "Password should contain one number";
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return "Password should contain one special character";
        }

        return "";
    };

    // Form Validation
    const validateForm = () => {

        let validationErrors = {};

        // Name Validation
        if (formdata.name.trim() === "") {
            validationErrors.name = "Name is required";
        } else if (formdata.name.length < 3) {
            validationErrors.name = "Name should be at least 3 characters";
        }

        // Email Validation
        if (formdata.email.trim() === "") {
            validationErrors.email = "Email is required";
        } else if (!formdata.email.includes("@")) {
            validationErrors.email = "Invalid Email";
        }

        // Password Validation
        const passwordError = validatePassword(formdata.password);

        if (passwordError) {
            validationErrors.password = passwordError;
        }

        return validationErrors;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
        return;
    }

    try {
        const response = await fetch(
            "https://662203b327fcd16fa6c87950.mockapi.io/api/v1/users",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formdata)
            }
        );

        if (!response.ok) {
            throw new Error("Failed to submit data");
        }

        const result = await response.json();

        console.log(result);

        alert("Data Submitted Successfully!");

        // Clear form
        setformdata({
            name: "",
            email: "",
            password: ""
        });

        setErrors({});

    } catch (error) {
        console.log(error);
        alert("Something went wrong!");
    }
};

    return (
        <>
            <form onSubmit={handleSubmit}>

                <label>Name:</label><br />

                <input
                    type="text"
                    name="name"
                    value={formdata.name}
                    onChange={handleChange}
                />

                <p style={{ color: "red" }}>
                    {errors.name}
                </p>

                <label>Email:</label><br />

                <input
                    type="email"
                    name="email"
                    value={formdata.email}
                    onChange={handleChange}
                />

                <p style={{ color: "red" }}>
                    {errors.email}
                </p>

                <label>Password:</label><br />

                <input
                    type="password"
                    name="password"
                    value={formdata.password}
                    onChange={handleChange}
                />

                <p style={{ color: "red" }}>
                    {errors.password}
                </p>

                <button type="submit">
                    Submit
                </button>

            </form>

            <hr />

            <h2>Details</h2>

            <p><strong>Name:</strong> {formdata.name}</p>
            <p><strong>Email:</strong> {formdata.email}</p>
            <p><strong>Password:</strong> {formdata.password}</p>

        </>
    );
};

export default Form2;