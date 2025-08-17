// const {commonApi} = require("./commonApi")
// const {serverURL} = require("./serverURL")
import { commonApi } from "./commonApi"
import { serverURL } from "./serverURL"

// 1. add resume details to the server - POST -reqBody
export const addResumeAPI = async (reqBody) => {   //this is exporting to frontend
    return await commonApi("post",`${serverURL}/resumes`,reqBody)
}

// get all resumes
export const getAllResumeAPI = async () => {
    return await commonApi("GET",`${serverURL}/resumes`,"")
}

// delete a particular resume
export const deleteResumeAPI = async (id) => {
    return await commonApi("DELETE",`${serverURL}/resumes/${id}`,"")
}

// get a particular resume API - to edit
export const getEditResumeAPI  = async (id) => {
    return await commonApi("GET",`${serverURL}/resumes/${id}`,"")
}

// update Resume API
export const updateResumeAPI = async (id,reqBody) => {   
    return await commonApi("PUT",`${serverURL}/resumes/${id}/`,reqBody)
}
