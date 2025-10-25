import axios from 'axios'

import React from 'react'

const commonAPI = async(http,url,reqBody) => {

    const reqConfig={
        method:http,
        url,
        data:reqBody,
        headers:{"Content-Type":"application/json"}
    }


    try {
        const res=await axios(reqConfig)
        return res
    } catch (error) {
        return error
    }
  
}

export default commonAPI