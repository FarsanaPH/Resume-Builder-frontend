import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { deleteResumeAPI, getAllResumeAPI } from '../Service/allApi';
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";

function HistoryPage() {

  const [resumeData, setResumeData] = useState([])

  const getAllResume = async () => {
    try {
      const result = await getAllResumeAPI()
      console.log("result:", result);
      setResumeData(result.data)   // In console,result gives all resumes in  key data 
    } catch (err) {
      console.log(`Server Error:`, err);
      toast.error(`Server Error: Failed in fetching Data, Please Try Again!!`)
    }

  }
  console.log("resume data", resumeData);

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




  return (
    <>
      <div className='py-3 container'>
        <h1 className="text-center py-4">Resume Downloaded History</h1>
        <div className="d-flex justify-content-end me-3">
          <Link to={"/form"}><button className='btn btn-primary mb-5'>BACK</button></Link>
        </div>
        <div className="row">
          {
            resumeData?.length > 0 ? (
              resumeData?.map((item) => (
                <div className="col-md-3 mb-3">
                  <Card style={{ width: '100%' }}>
                    <Card.Body>
                      <div className='d-flex justify-content-between'>
                        <Card.Title>{item?.name}</Card.Title>
                        <span className='btn m-0 p-0' onClick={() => handleDeleteResume(item?.id)}><MdDelete className='text-danger fs-3' /></span>
                      </div>
                      <Card.Subtitle className="mb-2 text-muted">{item?.jobTitle}</Card.Subtitle>
                      <Card.Title>{item?.courseName}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{item?.college} | {item?.university} | {item?.year}</Card.Subtitle>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) :
              "NO RESUME ADDED"
          }
        </div>
      </div>
    </>
  )
}

export default HistoryPage