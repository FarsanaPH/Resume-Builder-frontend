import React from 'react'
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
    return (
        <>
            <div className="px-3 pt-5" style={{ backgroundColor: "rgba(60, 16, 60, 1)" }}>
                <div className="row pb-3">
                    <div className="col-4 ps-3 text-light">
                        <h1 className='text-light'><span style={{ color: "orange", fontSize: "40px", fontWeight: "600" }}>R</span>Builder</h1>
                        <p style={{ textAlign: "justify" }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe voluptates illum velit. Voluptate ex deserunt dolorum similique veniam aspernatur aliquid, voluptatum ipsam sequi modi? Atque consectetur itaque at eum dolor?</p>
                    </div>
                    <div className="col-4 ps-5 justify-content-end ">
                        <h1 className='text-light'><span style={{ color: "orange", fontSize: "40px", fontWeight: "600" }}>Q</span>uick <span
                            style={{ color: "orange", fontSize: "40px", fontWeight: "600" }}>L</span>inks</h1>
                        <ul className='text-white'>
                            <li><a href="" className='text-white text-decoration-none'>Home</a></li>
                            <li><a href="" className='text-white text-decoration-none'>Resume Creator</a></li>
                            <li><a href="" className='text-white text-decoration-none'>History</a></li>
                        </ul>
                    </div>
                    <div className="col-4 px-5">
                        <h1 className='text-light'><span style={{ color: "orange", fontSize: "40px", fontWeight: "600" }}>C</span>ontact <span
                            style={{ color: "orange", fontSize: "40px", fontWeight: "600" }}>U</span>s</h1>
                        <form action="">
                            <div className='d-flex justify-content-between align-items-center'>
                                <input type="text" className='form-control me-3' placeholder='Enter Your Email' />

                            </div>
                        </form>
                        <div className='d-flex justify-content-between align-items-center mt-5'>
                            <FaFacebook className='fs-2 text-warning'/>
                            <FaInstagram className='fs-2 text-warning'/>
                            <FaLinkedin className='fs-2 text-warning'/>
                            <FaSquareXTwitter className='fs-2 text-warning'/>
                        </div>
                    </div>
                </div>
                <div><p className='text-center text-white pb-1'>© 2025 RBuilder. All rights reserved.</p></div>
            </div>
             
        </>
    )
}

export default Footer