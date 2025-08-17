
import React from 'react'
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <div className="px-3 pt-5 " style={{ backgroundColor: "rgba(60, 16, 60, 1)" }}>
                <div className="row pb-3">

                    {/* About Section */}
                    <div className="col-12 col-md-4 ps-3 text-light mb-4 mb-md-0">
                        <h1 className='text-light'>
                            <span style={{ color: "orange", fontSize: "40px", fontWeight: "600" }}>R</span>Builder
                        </h1>
                        <p style={{ textAlign: "justify" }}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe voluptates illum velit.
                            Voluptate ex deserunt dolorum similique veniam aspernatur aliquid, voluptatum ipsam sequi modi?
                            Atque consectetur itaque at eum dolor?
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="col-12 col-md-4 ps-md-5 mb-4 mb-md-0">
                        <h1 className='text-light'>
                            <span style={{ color: "orange", fontSize: "40px", fontWeight: "600" }}>Q</span>uick
                            <span style={{ color: "orange", fontSize: "40px", fontWeight: "600" }}>L</span>inks
                        </h1>
                        <ul className='text-white list-unstyled'>
                            <li><Link to="/" className='text-white text-decoration-none'>Home</Link></li>
                            <li><Link to="/resumeGenerator" className='text-white text-decoration-none'>Dashboard</Link></li>
                            <li><Link to="/history" className='text-white text-decoration-none'>History</Link></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="col-12 col-md-4 px-md-5">
                        <h1 className='text-light'>
                            <span style={{ color: "orange", fontSize: "40px", fontWeight: "600" }}>C</span>ontact
                            <span style={{ color: "orange", fontSize: "40px", fontWeight: "600" }}>U</span>s
                        </h1>
                        <form action="">
                            <div className='d-flex justify-content-between align-items-center'>
                                <input type="text" className='form-control me-3' placeholder='Enter Your Email' />
                            </div>
                        </form>
                        <div className='d-flex justify-content-between align-items-center mt-5'>
                            <FaFacebook className='fs-2 text-warning' />
                            <FaInstagram className='fs-2 text-warning' />
                            <FaLinkedin className='fs-2 text-warning' />
                            <FaSquareXTwitter className='fs-2 text-warning' />
                        </div>
                    </div>
                </div>

                {/* Bottom Line */}
                <div>
                    <p className='text-center text-white pb-1 mb-0'>
                        © 2025 RBuilder. All rights reserved.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Footer;
