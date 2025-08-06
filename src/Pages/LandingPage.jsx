import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import heroImg from '../assets/hero.jpg';
import toolsImg from '../assets/tools.png';

const LandingPage = () => {

  return (
    <>
      {/* Hero Section */}
      <div
        className="text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          position: 'relative',
        }}
      >
        <div
          className="text-center p-4 rounded"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <h1 className="fw-bold">Designed to get hired.</h1>
          <p>Your skills, your story, your next job — all in one.</p>
          <Link to={"/resumeGenerator"}>
          <button
            className="btn mt-3 px-4 py-2"
            style={{ backgroundColor: 'purple', color: 'white' }}
          >
            MAKE YOUR RESUME
          </button>
          </Link>
        </div>
      </div>

      {/* Tools Section */}
      <div className="container py-5">
        <h2 className="text-center mb-4">Tools</h2>
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5>Resume</h5>
            <p>Create unlimited new resumes and easily edit them afterwards.</p>
            <h5 className="mt-3">Cover Letters</h5>
            <p>Easily write professional cover letters.</p>
            <h5 className="mt-3">Jobs</h5>
            <p>Automatically receive new and relevant job postings.</p>
            <h5 className="mt-3">Applications</h5>
            <p>Effortlessly manage and track your job applications in an organized manner.</p>
          </div>
          <div className="col-md-6">
            <img src={toolsImg} alt="Resume Tools" className="img-fluid " />
          </div>
        </div>
      </div>

      {/* Testimony Section */}
      <div className="container py-5">
        <h2 className="text-center mb-5">Testimony</h2>
        <div className="row ">
          {/* Left Column - Text */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h5>Trusted by professionals worldwide.</h5>
            <p>
              At LiveCareer, we don't just help you create résumés — we help you land the job.
              Whether you're a seasoned professional or just starting out, our tools are designed to get results.
            </p>
            <p>
              In fact, users who used RBuilder reported getting hired an average of 48 days faster.
            </p>
            <p>
              Join thousands of job-seekers who’ve fast-tracked their careers with a résumé that truly stands out.
            </p>
          </div>

          {/* Right Column - Testimonials */}
          <div className="col-md-6 ">
            {/* Testimonial Card 1 */}
            <div className="card mb-4 shadow-sm ">
              <div className="card-body d-flex">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Sarah Johnson"
                  className="rounded-circle me-3"
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
                <div>
                  <h6 className="fw-bold mb-1">Sarah Johnson</h6>
                  <p className="fst-italic mb-2">
                    “This resume builder helped me land my dream job in just two weeks!”
                  </p>
                  <div style={{ color: '#ffbf00' }}>
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="card mb-4 shadow-sm">
              <div className="card-body d-flex">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Arjun Mehra"
                  className="rounded-circle me-3"
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
                <div>
                  <h6 className="fw-bold mb-1">Arjun Mehra</h6>
                  <p className="fst-italic mb-2">
                    “Clean templates, easy to use, and got me noticed by recruiters fast!”
                  </p>
                  <div style={{ color: '#ffbf00' }}>
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
            </div>

            {/* Testimony card 3 */}
            <div className="card mb-4 shadow-sm">
              <div className="card-body d-flex">
                <img
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="Priya Das"
                  className="rounded-circle me-3"
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
                <div>
                  <h6 className="fw-bold mb-1">Priya Das</h6>
                  <p className="fst-italic mb-2">
                    “Easy to use and very professional. Helped me stand out!.”
                  </p>
                  <div style={{ color: '#ffbf00' }}>
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
