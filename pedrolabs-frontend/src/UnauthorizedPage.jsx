import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ExclamationTriangleFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";


const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-container d-flex justify-content-center align-items-center vh-100">
      <div className="unauthorized-card text-center bg-white p-5 rounded shadow-lg">
        <ExclamationTriangleFill className="icon text-danger mb-3" size={50} />
        <h2 className="text-danger">Access Denied</h2>
        <p className="text-muted">You do not have permission to view this page.</p>
        <Link to="/">
          <Button variant="danger" size="lg" style={{fontSize: "12px",
                      margin: 0, 
                      whiteSpace: "nowrap", 
                      paddingRight:'80px',
                      paddingBottom:'30px'}}>Go Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
