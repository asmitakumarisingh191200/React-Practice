import { Link } from "react-router-dom";

const MultiFormPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Multi Form Page</h1>

      <div style={{ marginBottom: "20px", display: "flex", gap: "15px" }}>
        <Link to="/feedback"><button>Feedback Form</button></Link>
        <Link to="/contact"><button>Contact Form</button></Link>
        <Link to="/register"><button>Registration Form</button></Link>
      </div>
    </div>
  );
};

export default MultiFormPage;
