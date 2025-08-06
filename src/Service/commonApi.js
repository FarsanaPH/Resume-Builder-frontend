import axios from "axios"

export const commonApi = (httpRequest, url, reqBody) => {
    const reqConfig = {
        method : httpRequest,
        url,              //means url : url
        data: reqBody
    }

    return axios(reqConfig).then((res)=>{
        return res   // backend store if res
    }).catch((err)=>{
        return err
    })
  }







