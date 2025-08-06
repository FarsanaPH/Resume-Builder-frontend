import React from 'react'
import { Divider } from '@mui/material'
import { FaFileDownload } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import Edit from './Edit';
import { Link } from 'react-router-dom';


function Preview({resumeData, editID}) {
  console.log("preview data:",resumeData);
  //destructure - skills=resumeData.skills
  const { skills, name, jobTitle, location, email, phoneNumber, github, linkedIn, portfolio, courseName, 
    college, university, year, jobRole, company, companyLocation, duration, summary } = resumeData
   
  
  return (
    <>    
      {/* 4 icons at top of page */}
      <div className='d-flex justify-content-end gap-3 mt-5'>
        <button className='btn btn-primary'><FaFileDownload /></button>
        <Link to={"/history"} className='btn btn-primary'><FaHistory /></Link>
        <Edit editID={editID} />  {/* calling Edit Component in Preview, deleteID to padd to edit */}
        <Link to={"/resumeGenerator"} className='btn btn-primary'>BACK</Link>
      </div>

      <div className="mx-5 my-3 shadow-lg px-5 pb-5">
        <div>
          <div className="text-center">
            <h3 className="pt-3">{name || "Your Name"}</h3> {/*OR <h3 className="pt-3">{resumeData?.name || "Your Name"}</h3> */}
            <span className='pt-2 text-primary'>{jobTitle || "Job Role"}</span>
          </div>
          <div className='text-center mt-2'>
            <h6>{phoneNumber || "Phone Number" } | {email || "youremail@gmail.com"}  | {location || "Location"}</h6>
          </div>
          <div className="mt-2 text-center">
            <a href={github} target='_blank' className="me-3 ms-3">Github</a> |
            <a href={linkedIn} target='_blank' className="me-3 ms-3">LinkedIn</a> |
            <a href={portfolio} target='_blank' className="me-3 ms-3">Portfolio</a>
          </div>
        </div>
        <div className='mt-3'>
          <Divider>Summary</Divider>
          <p style={{ textAlign: "justify" }}>{summary || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto itaque ut suscipit qui minus doloribus similique, delectus optio autem. Quidem illo eaque nulla maxime esse sint, eius soluta hic quibusdam?"}</p>
        </div>
        <div className='mt-3 text-center'>
          <Divider>Education</Divider>
          <h6 className='mt-2'>{courseName || "Course Name"}</h6>
          <h6>{college || "College" } | {university || "University"}  | {year || "Passout Year"}</h6>
        </div>
        <div className='mt-3 text-center'>
          <Divider>Professional Experience</Divider>
          <h6 className='mt-2'>{jobRole || "Job Role"}</h6>
          <h6>{company || "Company" } | {companyLocation || "Location"}  | {duration || "Duration"}</h6>
        </div>
        <div className='mt-3 text-center'>
          <Divider>Skills</Divider>
          <div className="m-2">
            {
               skills?.map((item) => (
                <button className='btn btn-primary me-3 mt-3'>{item}</button>
               ))                                                                                            
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Preview