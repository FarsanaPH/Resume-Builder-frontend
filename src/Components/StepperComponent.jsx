import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { TiDelete } from "react-icons/ti";
import { FaCheckCircle } from "react-icons/fa";
import { addResumeAPI } from '../Service/allApi';
import { toast } from 'react-toastify';


const steps = ['Basic Information',
    'Contact Details',
    'Education Details',
    'Work Experience',
    'Skills & Certifications',
    'Review & Submit'];

function StepperComponent({ resumeData, setResumeData, setIsSubmitted, setEditID }) {
    console.log(resumeData);

    //destructing  means skills=resumeData.skills
    const { skills, name, jobTitle, location, email, phoneNumber, github, linkedIn, portfolio, courseName, college, university, year, jobRole, company, companyLocation, duration, summary } = resumeData
    console.log("skill is", skills);

    const [inputSkill, setInputSkill] = useState("")
    console.log("inputting skill is", inputSkill);

    const addSkill = (addSkill) => {
        console.log("added skills from add function is:", addSkill);

        const upperSkill = addSkill.trim().toUpperCase(); // convert input to uppercase and trim spaces
        if (!upperSkill) {  //ie, null,undefined or empty string added
            toast.warning(`Enter Skill!!`);
        } else {
            if (skills.includes(upperSkill)) {
                toast.warning(`Skill already added...`);
            } else {
                setResumeData({ ...resumeData, skills: [...skills, upperSkill] });
                setInputSkill("");
            }
        }
    }

    const deleteSkill = (itemToDelete) => {
        console.log("deleting skill:", itemToDelete);
        setResumeData({ ...resumeData, skills: skills.filter(item => item !== itemToDelete) })
    }


    const [showSuccess, setShowSuccess] = useState(false);

    // this function do api call to submit resume to backend db.json
    const handleSubmitResume = async () => {
        if (!skills || !name || !jobTitle || !location || !email || !phoneNumber ||
            !courseName || !college || !university || !year || !jobRole ||
            !company || !companyLocation || !duration || !summary) {
            toast.error(`Fill the form completely!!`)
        } else {
            try {
                const result = await addResumeAPI(resumeData) //addResumeAPI is function in allApi.js in service
                console.log("backend db.json now stored one resume:", result);
                setEditID(result.data.id) // to pass to preview. there then to its child Edit

                if (result.status >= 200 && result.status < 300) {
                    setShowSuccess(true); // show popup

                    // Delay navigation to only Preview Page so popup is visible
                    setTimeout(() => {
                        setShowSuccess(false); // Hide popup
                        setIsSubmitted(true);   // THEN show only Preview-(Form.js logic)
                    }, 1500); // show for 1.5 seconds

                } else {
                    toast.error(`Failed in Adding Resume, Please Try Again!!`)
                }

            } catch (err) {
                console.log(`Server Error: ${err}`);
                toast.error(`Server Error, Please Try Again!!`)
            }
        }

    }

    const suggestion = ["REACT", "ANGULAR", "NODE JS", "EXPRESS", "JAVASCRIPT", "MONGO DB", "GIT", "HTML", "CSS", "BOOTSTRAP", "TAILWIND"]


    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleReset = () => {
        setActiveStep(0);
        setResumeData({
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
    };

    const handleFinish = () => {
        if (!skills || !name || !jobTitle || !location || !email || !phoneNumber ||
            !courseName || !college || !university || !year || !jobRole ||
            !company || !companyLocation || !duration || !summary) {
            toast.error(`Fill the details completely!!`)
        }
    }

    const handleNext = () => {
        // Run validation for current step
        switch (activeStep) {
            case 0:
                validateField("name", resumeData.name);
                validateField("jobTitle", resumeData.jobTitle);
                validateField("location", resumeData.location);
                break;
            case 1:
                validateField("email", resumeData.email);
                validateField("phoneNumber", resumeData.phoneNumber);
                validateField("github", resumeData.github);
                validateField("linkedIn", resumeData.linkedIn);
                validateField("portfolio", resumeData.portfolio);
                break;
            case 2:
                validateField("courseName", resumeData.courseName);
                validateField("college", resumeData.college);
                validateField("university", resumeData.university);
                validateField("year", resumeData.year);
                break;
            case 3:
                validateField("jobRole", resumeData.jobRole);
                validateField("company", resumeData.company);
                validateField("companyLocation", resumeData.companyLocation);
                validateField("duration", resumeData.duration);
                break;
            case 5:
                validateField("summary", resumeData.summary);
                break;
            default:
                break;
        }


        // Validation before clicking finish
        if (activeStep === steps.length - 1) {
            // Last step, don't directly finish
            handleFinish()
        }
        else {
            if (!skills || !name || !jobTitle || !location || !email || !phoneNumber ||
                !courseName || !college || !university || !year || !jobRole ||
                !company || !companyLocation || !duration || !summary) {

            } else {
                let newSkipped = skipped;
                if (isStepSkipped(activeStep)) {
                    newSkipped = new Set(newSkipped.values());
                    newSkipped.delete(activeStep);
                }
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setSkipped(newSkipped);
            }
        }
    };


    // for validations
    // const inputRefs = useRef({});
    const [errors, setErrors] = useState({});
    const validateField = (name, value) => {
        let message = "";
        switch (name) {
            case "name":
            case "jobTitle":
            case "location":
            case "courseName":
            case "college":
            case "university":
            case "jobRole":
            case "company":
            case "companyLocation":
            case "duration":
            case "skills":
                if (!value.trim()) message = "This field is required";
                break;
            case "email":
                if (!value) message = "Email is required";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = "Invalid email format";
                break;
            case "phoneNumber":
                if (!value) message = "Phone number is required";
                else if (!/^[0-9]{10}$/.test(value)) message = "Enter a valid 10-digit number";
                break;
            case "year":
                if (!value) message = "Year is required";
                else if (value < 1900 || value > 2100) message = "Enter a valid year";
                break;
            case "github":
            case "linkedIn":
            case "portfolio":
                if (value && !/^https?:\/\/.+\..+/.test(value)) message = "Enter a valid URL";
                break;
            default: break;
        }
        setErrors((prev) => ({ ...prev, [name]: message }));
    };

    // The called renderStepperContent function from below which is seen on webpage
    // if we click NEXT, setactivesteps  increments and when we click BACk, setactivesteps decrements
    const renderStepperContent = (stepIndex) => {
        switch (stepIndex) {
            case 0: return (
                <>
                    <h5>Personal Information</h5>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                name="name"
                                value={resumeData.name}
                                label="Full Name*"
                                onChange={(e) => {
                                    setResumeData({ ...resumeData, name: e.target.value });
                                    validateField("name", e.target.value);
                                }}
                                error={!!errors.name}
                                helperText={errors.name}



                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                name="jobTitle"
                                value={resumeData.jobTitle}
                                label="Job Title*"
                                onChange={(e) => {
                                    setResumeData({ ...resumeData, jobTitle: e.target.value });
                                    validateField("jobTitle", e.target.value);
                                }}
                                error={!!errors.jobTitle}
                                helperText={errors.jobTitle}


                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                name="location"
                                value={resumeData.location}
                                label="Location*"
                                onChange={(e) => {
                                    setResumeData({ ...resumeData, location: e.target.value });
                                    validateField("location", e.target.value);
                                }}
                                error={!!errors.location}
                                helperText={errors.location}



                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>

                    </Grid>

                </>
            );
            case 1: return (
                <>
                    <h5>Contact Details</h5>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                name="email"
                                value={resumeData.email}
                                label="Email*"
                                onChange={(e) => {
                                    setResumeData({ ...resumeData, email: e.target.value });
                                    validateField("email", e.target.value);
                                }}
                                error={!!errors.email}
                                helperText={errors.email}


                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                name="phoneNumber"
                                value={resumeData.phoneNumber}
                                label="Phone Number*"
                                onChange={(e) => {
                                    setResumeData({ ...resumeData, phoneNumber: e.target.value });
                                    validateField("phoneNumber", e.target.value);
                                }}
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber}


                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                name="github"
                                value={resumeData.github}
                                label="GitHub Profile Link"

                                onChange={(e) => {
                                    setResumeData({ ...resumeData, github: e.target.value });
                                    validateField("github", e.target.value);
                                }}
                                error={!!errors.github}
                                helperText={errors.github}


                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                name="linkedIn"
                                value={resumeData.linkedIn}
                                label="LinkedIn Profile Link"

                                onChange={(e) => {
                                    setResumeData({ ...resumeData, linkedIn: e.target.value });
                                    validateField("linkedIn", e.target.value);
                                }}
                                error={!!errors.linkedIn}
                                helperText={errors.linkedIn}


                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                name="portfolio"
                                value={resumeData.portfolio}
                                label="Portfolio Link"

                                onChange={(e) => {
                                    setResumeData({ ...resumeData, portfolio: e.target.value });
                                    validateField("portfolio", e.target.value);
                                }}
                                error={!!errors.portfolio}
                                helperText={errors.portfolio}


                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </>
            );
            case 2: return (
                <>
                    <h5>Education Details</h5>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                name="courseName"
                                value={resumeData.courseName}
                                label="Course Name*"

                                onChange={(e) => {
                                    setResumeData({ ...resumeData, courseName: e.target.value });
                                    validateField("courseName", e.target.value);
                                }}
                                error={!!errors.courseName}
                                helperText={errors.courseName}


                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                name="college"
                                value={resumeData.college}
                                label="College Name*"

                                onChange={(e) => {
                                    setResumeData({ ...resumeData, college: e.target.value });
                                    validateField("college", e.target.value);
                                }}
                                error={!!errors.college}
                                helperText={errors.college}


                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                name="university"
                                value={resumeData.university}
                                label="University*"
                                onChange={(e) => {
                                    setResumeData({ ...resumeData, university: e.target.value });
                                    validateField("university", e.target.value);
                                }}
                                error={!!errors.university}
                                helperText={errors.university}


                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                name="year"
                                value={resumeData.year}
                                label="Year of Passout*"

                                onChange={(e) => {
                                    setResumeData({ ...resumeData, year: e.target.value });
                                    validateField("year", e.target.value);
                                }}
                                error={!!errors.year}
                                helperText={errors.year}


                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </>
            );
            case 3: return (
                <>
                    <h5>Professional Details</h5>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                name="jobRole"
                                value={resumeData.jobRole}
                                label="Job Role*"

                                onChange={(e) => {

                                    setResumeData({ ...resumeData, jobRole: e.target.value });
                                    validateField("jobRole", e.target.value);
                                }}
                                error={!!errors.jobRole}
                                helperText={errors.jobRole}


                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                name="company"
                                value={resumeData.company}
                                label="Company Name*"

                                onChange={(e) => {
                                    setResumeData({ ...resumeData, company: e.target.value });
                                    validateField("company", e.target.value);
                                }}
                                error={!!errors.company}
                                helperText={errors.company}


                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                name="companyLocation"
                                value={resumeData.companyLocation}
                                label="Location*"

                                onChange={(e) => {
                                    setResumeData({ ...resumeData, companyLocation: e.target.value });
                                    validateField("companyLocation", e.target.value);
                                }}
                                error={!!errors.companyLocation}
                                helperText={errors.companyLocation}


                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                name="duration"
                                value={resumeData.duration}
                                label="Duration*"

                                onChange={(e) => {
                                    setResumeData({ ...resumeData, duration: e.target.value });
                                    validateField("duration", e.target.value);
                                }}
                                error={!!errors.duration}
                                helperText={errors.duration}


                                maxRows={4}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </>
            );
            case 4: return (
                <>
                    <h3>Skills & Certifications</h3>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                value={inputSkill}
                                name="skills"
                                label="Add Skill*"
                                onChange={(e) => {
                                    setInputSkill(e.target.value)
                                    validateField("skills", e.target.value);
                                }}
                                error={!!errors.phone}
                                helperText={errors.phone}

                                maxRows={4}
                                variant="standard"
                                multiline
                                fullWidth
                            />
                            <Button onClick={() => addSkill(inputSkill)} className='btn btn-primary mt-3' variant='outlined'>ADD+</Button>

                            <div className="mt-3">
                                <h5>Suggestions :</h5>
                                {
                                    suggestion?.map((item) => (
                                        <Button onClick={() => addSkill(item)} className='btn btn-primary mt-3 me-2' variant='outlined'>{item}</Button>
                                    ))
                                }
                            </div>

                            <div className="mt-3">
                                <h5>Added Skills:</h5>
                                {
                                    skills?.length > 0 ?
                                        skills?.map((item) => (
                                            <span className='btn btn-primary mb-3 me-3'>
                                                {item} {/*items in skill array*/}
                                                <button onClick={() => deleteSkill(item)} className='btn btn-primary'>
                                                    <TiDelete className='fs-3' />
                                                </button>
                                            </span>
                                        )) : ""
                                }
                            </div>
                        </Grid>
                    </Grid>
                </>
            );
            case 5: return (
                <>
                    <h5>Professional Summary</h5>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                name="summary"
                                value={resumeData.summary}
                                label="Write a short summary of yourself"

                                onChange={(e) => {
                                    setResumeData({ ...resumeData, summary: e.target.value });
                                    validateField("summary", e.target.value);
                                }}
                                error={!!errors.summary}
                                helperText={errors.summary}


                                variant="standard"
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>
                </>
            );
            default: return null;
        }
    }


    return (
        <>
            <Box sx={{ width: '100%' }}  >
                <Stepper activeStep={activeStep} className='d-flex flex-wrap flex-lg-nowrap gap-3 gap-lg-0' >
                    {/* here used the array steps */}
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        // if (isStepOptional(index)) {
                        //     labelProps.optional = (
                        //         <Typography variant="caption">Optional</Typography>
                        //     );
                        // }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps} >
                                <StepLabel {...labelProps} >{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment >
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
                            <button onClick={handleReset} className='btn btn-danger'>RESET</button>
                            {/* this function handleSubmitResume do api call to addresume to db.json   */}
                            <button onClick={handleSubmitResume} className='btn text-light bg-success' >SUBMIT RESUME</button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                        {/* This is where we change to see on the webpage */}
                        {renderStepperContent(activeStep)}
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />

                            {/* ✅ Show Skip button only if not last step */}
                            {activeStep !== steps.length - 1 && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}
                            <Button onClick={handleNext} color="primary">
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>

            {showSuccess && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
                    <div className="bg-success text-white p-4 rounded text-center shadow">
                        <FaCheckCircle size={60} className="mb-3 bg-white text-success rounded-circle p-1" />
                        <h5>Resume Submitted Successfully!</h5>
                    </div>
                </div>
            )}
        </>
    );
}

export default StepperComponent;
