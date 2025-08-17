import { FaDownload, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import heroImg from '../assets/shake.jpg';

function ResumeGenerator() {
  return (
    <div
  className="d-flex flex-column justify-content-center align-items-center text-center"
  style={{
    backgroundImage: `url(${heroImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    position: 'relative'
  }}
>
   {/* Overlay Layer */}
        <div
          style={{
            position: 'absolute',
            top:0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.2)', 
            zIndex: 1,
          }}
        />
  <h3 className="mb-5 text-white fs-2 text-shadow-lg fw-bold " style={{zIndex:2}}>Create a job-winning Resume in minutes</h3>

  <div className="row justify-content-center mb-4 w-100" style={{zIndex:2}}>
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

    <div className="col-md-4 mb-3" style={{zIndex:2}}>
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

  <Link to="/form" className="btn btn-lg" style={{ backgroundColor: 'purple', color: 'white', zIndex:2 }}>LETS START</Link>
</div>

  );
}

export default ResumeGenerator;
