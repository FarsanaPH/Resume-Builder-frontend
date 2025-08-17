import React from 'react'
import { Divider } from '@mui/material'
import { FaFileDownload } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import Edit from './Edit';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



function Preview({ resumeData, editID, setResumeData, isSubmitted }) {
  console.log("preview data:", resumeData);
  //destructure - skills=resumeData.skills
  const { skills, name, jobTitle, location, email, phoneNumber, github, linkedIn, portfolio, courseName,
    college, university, year, jobRole, company, companyLocation, duration, summary } = resumeData

  // const downloadPDF = async () => {
  //   const input = document.getElementById("result") //to get the id
  //   const canvas = await html2canvas(input, { scale: 2 }) //convert selected html to canvas(screenshot)
  //   const imgData = canvas.toDataURL("image/png") // convert canvas into image url

  //   // create PDF
  //   const PDF = new jsPDF("p", "mm", "a4")  // create new PDF document
  //   const PDFWidth = PDF.internal.pageSize.getWidth()  // get width of PDF
  //   const PDFHeight = (canvas.height * PDFWidth) / canvas.width // calculate height of PDF  based on the width
  //   PDF.addImage(imgData, "png", 0, 0, PDFWidth, PDFHeight)  // add image to PDF
  //   PDF.save(`${name || "resume"}`) //we can give any name to save
  // }

  const downloadPDF = async () => {
    const input = document.getElementById("result");
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // create PDF
    const PDF = new jsPDF("p", "mm", "a4");
    const PDFWidth = PDF.internal.pageSize.getWidth();
    const PDFHeight = PDF.internal.pageSize.getHeight(); // fixed A4 page height
    const imgHeight = (canvas.height * PDFWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // add first page
    PDF.addImage(imgData, "PNG", 0, position, PDFWidth, imgHeight > PDFHeight ? PDFHeight : PDFHeight);

    heightLeft -= PDFHeight;

    // if content is longer than one page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      PDF.addPage();
      PDF.addImage(imgData, "PNG", 0, position, PDFWidth, imgHeight > PDFHeight ? PDFHeight : PDFHeight);
      heightLeft -= PDFHeight;
    }

    PDF.save(`${name || "resume"}.pdf`);
  };


  return (
    <>
      {/* 4 icons at top of page */}
      <div className='d-flex justify-content-end gap-3 mt-5'>
        {
          isSubmitted && <div className='d-flex gap-3'>
            <button onClick={downloadPDF} className='btn text-light' style={{ backgroundColor: 'purple' }}><FaFileDownload /></button>
            <Edit editID={editID} setResumeData={setResumeData} />  {/* calling Edit Component in Preview, deleteID to padd to edit */}
          </div>
        }
        <Link to={"/history"} className='btn text-light' style={{ backgroundColor: 'purple' }}><FaHistory /></Link>
        <Link to={"/"} className='btn text-light' style={{ backgroundColor: 'purple' }}>BACK</Link>
      </div>

      {/* id setted for PDF*/}
      <div id="result" className="mx-1 mx-md-5 my-3 shadow-lg rounded px-5 pb-5">
        <div>
          <div className="text-center">
            <h3 className="pt-3">{name || "Your Name"}</h3> {/*OR <h3 className="pt-3">{resumeData?.name || "Your Name"}</h3> */}
            <span className='pt-2 text-primary'>{jobTitle || "Job Role"}</span>
          </div>
          <div className='text-center mt-2'>
            <h6>{phoneNumber || "Phone Number"} | {email || "youremail@gmail.com"}  | {location || "Location"}</h6>
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
          <h6>{college || "College"} | {university || "University"}  | {year || "Passout Year"}</h6>
        </div>
        <div className='mt-3 text-center'>
          <Divider>Professional Experience</Divider>
          <h6 className='mt-2'>{jobRole || "Job Role"}</h6>
          <h6>{company || "Company"} | {companyLocation || "Location"}  | {duration || "Duration"}</h6>
        </div>
        <div className='mt-3 text-start '>
          <Divider>Skills</Divider>
          <div className="m-2 d-flex flex-wrap">
            {
              skills?.map((item) => (
                <span className=' me-3 mt-1'>{item}</span>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Preview