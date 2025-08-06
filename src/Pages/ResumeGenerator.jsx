import { FaDownload, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function ResumeGenerator() {
  return (
    <div className="container text-center my-5">
      <h3 className="mb-4">Create a job-winning Resume in minutes</h3>

      <div className="row justify-content-center mb-4">
        <div className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <div className="mb-3 text-primary" style={{ fontSize: "40px" }}>
              <FaFileAlt />
            </div>
            <h5 className="card-title">Add your information</h5>
            <p className="card-text">Add pre-written examples to each section</p>
            <small>Step 1</small>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <div className="mb-3 text-danger" style={{ fontSize: "40px" }}>
              <FaDownload />
            </div>
            <h5 className="card-title">Download your Resume</h5>
            <p className="card-text">Download and start applying</p>
            <small>Step 2</small>
          </div>
        </div>
      </div>
      <Link to="/form" className="btn btn-lg"  style={{ backgroundColor: 'purple', color: 'white' }}>LETS START</Link>
  
    </div>
  );
}

export default ResumeGenerator;
