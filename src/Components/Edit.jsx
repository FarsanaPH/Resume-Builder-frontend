import React from 'react'
import { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { getEditResumeAPI, updateResumeAPI } from '../Service/allApi';
import { toast } from 'react-toastify';
import { TiDelete } from "react-icons/ti";

function Edit({ editID, setResumeData }) {
    console.log("Edit ID:", editID);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        getEditResume();  // getEditResume function calling within handleshow function calling which is called when clikcing edit button
    }

    const [editData, setEditData] = useState({
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
        summary: "",
        id: ""
    })
    const [editInputSkill, setEditInputSkill] = useState("")

    const getEditResume = async () => {
        try {
            const result = await getEditResumeAPI(editID)  //this gives the object with id eqauls to now submitted resume id
            console.log("result", result);
            setEditData(result.data) //result.data gives that editIDs data in object form

        } catch (err) {
            console.log("Server Error:", err);
            toast.error("Server Error: Failed in Fetching Data, Please Try Again!!")

        }
    }
    console.log("Edit Data is:", editData);

    const updateResume = async () => {
        if (!editData.skills || !editData.name || !editData.jobTitle || !editData.location || !editData.email || !editData.phoneNumber ||
            !editData.github || !editData.linkedIn || !editData.portfolio || !editData.courseName || !editData.college || !editData.university ||
            !editData.year || !editData.jobRole || !editData.company || !editData.companyLocation || !editData.duration || !editData.summary) {
            toast.warning(`Fill the form completely!!`)
        } else {
            try {
                const result = await updateResumeAPI(editID, editData)  //this gives the object with id eqauls to now submitted resume id
                console.log("result", result);
                setResumeData(result.data)
                handleClose()

            } catch (err) {
                console.log("Server Error:", err);
                toast.error("Server Error: Failed in Fetching Data, Please Try Again!!")

            }
        }

    }

    const addSkill = (addSkill) => {
        console.log("added skills from add function is:", addSkill);

        const upperSkill = addSkill.trim().toUpperCase(); // convert input to uppercase and trim spaces
        if (!upperSkill) {  //ie, null,undefined or empty string added
            toast.warning(`Enter Skill!!`);
        } else {
            if (editData.skills.includes(upperSkill)) {
                toast.warning(`Skill already added...`);
            } else {
                setEditData({ ...editData, skills: [...editData.skills, upperSkill] });
                setEditInputSkill("");
            }
        }
    }

    const deleteSkill = (itemToDelete) => {
        setEditData({ ...editData, skills: editData.skills.filter(item => item !== itemToDelete) })
    }

    return (
        <>
            <button  onClick={handleShow} className='btn text-light' style={{ backgroundColor: 'purple' }}>
                <FaEdit />
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: 'purple' }}>EDIT RESUME</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-3">
                        <h4>Personal Information</h4>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <TextField
                                    label="Full Name"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}

                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    label="Job Title"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.jobTitle}
                                    onChange={(e) => setEditData({ ...editData, jobTitle: e.target.value })}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    label="Location"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.location}
                                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                />
                            </Grid>

                        </Grid>
                    </div>
                    <div className="mt-3">
                        <h4>Contact Details</h4>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <TextField
                                    label="Email"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.email}
                                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    label="Phone Number"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.phoneNumber}
                                    onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    label="GitHub Profile Link"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.github}
                                    onChange={(e) => setEditData({ ...editData, github: e.target.value })}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    label="LinkedIn Profile Link"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.linkedIn}
                                    onChange={(e) => setEditData({ ...editData, linkedIn: e.target.value })}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    label="Portfolio Link"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.portfolio}
                                    onChange={(e) => setEditData({ ...editData, portfolio: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="mt-3">
                        <h4>Education Details</h4>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <TextField
                                    label="Course Name"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.courseName}
                                    onChange={(e) => setEditData({ ...editData, courseName: e.target.value })}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    label="College Name"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.college}
                                    onChange={(e) => setEditData({ ...editData, college: e.target.value })}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    label="University"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.university}
                                    onChange={(e) => setEditData({ ...editData, university: e.target.value })}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    label="Year of Passout"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.year}
                                    onChange={(e) => setEditData({ ...editData, year: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="mt-3">
                        <h4>Professional Details</h4>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <TextField
                                    label="Job or Internship"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.jobRole}
                                    onChange={(e) => setEditData({ ...editData, jobRole: e.target.value })}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    label="Company Name"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.company}
                                    onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    label="Location"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.companyLocation}
                                    onChange={(e) => setEditData({ ...editData, companyLocation: e.target.value })}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                    label="Duration"
                                    maxRows={4}
                                    variant="standard"
                                    fullWidth
                                    value={editData?.duration}
                                    onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="mt-3">
                        <h4>Skills & Certifications</h4>
                        <TextField
                            label="Add Skill"
                            maxRows={4}
                            variant="standard"
                            multiline
                            fullWidth
                            value={editInputSkill}
                            onChange={(e) => setEditInputSkill(e.target.value)}
                        />
                        <Button onClick={() => addSkill(editInputSkill)} className='btn btn-primary mt-3' variant='outlined'>ADD+</Button>
                        <div className="mt-3">
                            <h5>Selected Skills :</h5>
                            <div className=''>
                                {
                                    editData?.skills.map((item) => (
                                        <span className='btn btn-primary mb-3 me-3'>
                                            {item} {/*items in skills array*/}
                                            <button onClick={() => deleteSkill(item)} className='btn btn-primary'>
                                                <TiDelete className='fs-3' />
                                            </button>
                                        </span>
                                    ))
                                }
                            </div>

                        </div>
                    </div>
                    <div className="mt-3">
                        <h4>Professional Summary</h4>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <TextField
                                    label="Write a short summary of yourself"
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={editData?.summary}
                                    onChange={(e) => setEditData({ ...editData, summary: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-danger' onClick={handleClose}>
                        Close
                    </button>
                    <button className='btn btn-success' onClick={updateResume}>Update</button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Edit