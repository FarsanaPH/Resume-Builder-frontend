import React, { useEffect, useState } from 'react'
import { deleteResumeAPI, getAllResumeAPI } from '../Service/allApi';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { Divider } from '@mui/material';
import { FaFileDownload } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Edit from '../Components/Edit';

function HistoryPage() {
  const [historyData, setHistoryData] = useState([])


  const getAllResume = async () => {
    try {
      const result = await getAllResumeAPI()
      console.log("result:", result);
      setHistoryData(result.data)   // In console, all resumes is objects within array in key data 
    } catch (err) {
      console.log(`Server Error:`, err);
      toast.error(`Server Error: Failed in fetching Data, Please Try Again!!`)
    }

  }
  console.log("history data", historyData);

  const handleDeleteResume = async (idToDelete) => {
    // console.log("Item id is:",idToDelete); 
    try {
      const result = await deleteResumeAPI(idToDelete)
      console.log(result);

      //called to fetch all resumes in backend after deleting. Otherwise backend will delete item but frontend not remove deleted item uless we refresh
      getAllResume()
    } catch (err) {
      console.log("Server Error:", err);
      toast.error(`Server Error: Failed in Deleting Data, Please Try Again!!`)
    }
  }

  //useEffect to get resumes on first render - getResume called here
  useEffect(() => {
    getAllResume()
  }, []) // <-- empty dependency array = run once on mount


  const downloadPDF = async (resumeId) => {
    const input = document.getElementById(`resume-${resumeId}`) //unique id for each resume
    const canvas = await html2canvas(input, { scale: 3 }) //convert selected html to canvas(screenshot)
    const imgData = canvas.toDataURL("image/png") // convert canvas into image url

    // create PDF
    const PDF = new jsPDF("p", "mm", "a4")  // create new PDF document
    const PDFWidth = PDF.internal.pageSize.getWidth()  // get width of PDF
    const PDFHeight = (canvas.height * PDFWidth) / canvas.width // calculate height of PDF  based on the width
    PDF.addImage(imgData, "png", 0, 0, PDFWidth, PDFHeight)  // add image to PDF
    PDF.save(`resume-${resumeId}.pdf`) //we can give any name to save
  }

  return (
    <>
      <div className="container pb-5">
        <h2 className="text-start py-4 text-secondary" >Your History</h2>

        <div className="row g-4">   {/* g-4 = spacing between cols/rows */}
          {
            historyData?.length > 0 ? (
              historyData.slice().reverse().map((item) => (
                <div className="col-12 col-md-6 col-lg-4" key={item?.id}>
                  <div className="px-3 pb-4 border rounded shadow h-100">
                    <div className="d-flex justify-content-end gap-2">
                      <Edit isHistory={true} editID={item?.id} getAllResume={getAllResume} />
                      <span onClick={() => downloadPDF(item?.id)} className='pt-1' >
                        <FaFileDownload className='fs-5 text-primary' />
                      </span>
                      <span onClick={() => handleDeleteResume(item?.id)} className="pt-1" >
                        <MdDelete className="text-danger fs-3" />
                      </span>
                    </div>

                    {/* unique id for each resume pdf */}
                    <div id={`resume-${item?.id}`}>
                      <div className=" px-3 py-3">
                        <div className="text-center">
                          <h3>{item?.name || "Your Name"}</h3>
                          <span className="pt-2 text-primary">{item?.jobTitle || "Job Role"}</span>
                        </div>

                        <div className="text-center mt-2">
                          <h6>{item?.phoneNumber || "Phone Number"} | {item?.email || "youremail@gmail.com"} | {item?.location || "Location"}</h6>
                        </div>

                        <div className="mt-2 text-center">
                          <a href={item?.github} target="_blank" className="me-3 ms-3">Github</a> |
                          <a href={item?.linkedIn} target="_blank" className="me-3 ms-3">LinkedIn</a> |
                          <a href={item?.portfolio} target="_blank" className="me-3 ms-3">Portfolio</a>
                        </div>

                        <div className="mt-3">
                          <Divider>Summary</Divider>
                          <p style={{ textAlign: "justify" }}>
                            {item?.summary || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto itaque ut suscipit qui minus doloribus similique, delectus optio autem."}
                          </p>
                        </div>

                        <div className="mt-3 text-center">
                          <Divider>Education</Divider>
                          <h6 className="mt-2">{item?.courseName || "Course Name"}</h6>
                          <h6>{item?.college || "College"} | {item?.university || "University"} | {item?.year || "Passout Year"}</h6>
                        </div>

                        <div className="mt-3 text-center">
                          <Divider>Professional Experience</Divider>
                          <h6 className="mt-2">{item?.jobRole || "Job Role"}</h6>
                          <h6>{item?.company || "Company"} | {item?.companyLocation || "Location"} | {item?.duration || "Duration"}</h6>
                        </div>

                        <div className="mt-3 text-start">
                          <Divider>Skills</Divider>
                          <div className="m-2 d-flex flex-wrap">
                            {item.skills?.map((skill, index) => (
                              <span key={index} className="me-3 mt-1">{skill}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>

                </div>
              ))
            ) : (
              <p className="text-center">NO RESUME HISTORY</p>
            )
          }
        </div>
      </div>

    </>
  )
}

export default HistoryPage