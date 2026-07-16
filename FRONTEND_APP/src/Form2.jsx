import { useState } from "react";

const Form2 = () => {

    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        if(formdata.name==="" || formdata.email==="" || formdata.password===""){
            alert("Please fill all the fields");
            e.preventDefault();
            return;
        }
        alert("Form submitted");
    };
    

    return (
        <>
            <form onSubmit={handleSubmit}>

                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formdata.name}
                    onChange={handleChange}
                /><br />

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formdata.email}
                    onChange={handleChange}
                /><br />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formdata.password}
                    onChange={handleChange}
                /><br />

                <button  onClick={handleSubmit}>Submit</button>

            </form>

            <hr />

            <h1>Details :</h1>

            <h2>Name: {formdata.name}</h2>
            <h2>Email: {formdata.email}</h2>
            <h2>Password: {formdata.password}</h2>

        </>
    );
};

export default Form2;