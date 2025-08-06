import React, { useState } from 'react'
import StepperComponent from '../Components/StepperComponent'
import Preview from '../Components/Preview'

function Form() {
    const [resumeData, setResumeData] = useState({
        name: "",
        jobTitle: "",
        location: "",
        email: "",
        phoneNumber: "",
        github: "",
        linkedIn: "",
        portfolio: "",
        courseName: "",
        college: "",
        university: "",
        year: "",
        jobRole: "",
        company: "",
        companyLocation: "",
        duration: "",
        skills: [],
        summary: ""

    })

    const [editID, setEditID] = useState("")

    const [isSubmitted, setIsSubmitted] = useState(false)
    return (
        <>
            <div className="container mt-5">
                {
                    isSubmitted ?
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-md-6">
                                <Preview resumeData={resumeData} editID={editID}/>
                            </div>
                            <div className="col-3"></div>
                        </div>
                        :
                        <div className="row">
                            <div className="col-md-6">
                                <StepperComponent setEditID={setEditID} resumeData={resumeData} setResumeData={setResumeData} setIsSubmitted={setIsSubmitted}/>
                            </div>
                            <div className="col-md-6">
                                <Preview resumeData={resumeData} />
                            </div>
                        </div>
                }

            </div>
        </>
    )
}

export default Form 