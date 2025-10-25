import commonAPI from "./commonAPI"
import SERVER_URL from "./server"

export const addEmployeeAPI=async(reqBody)=>{
    return await commonAPI('post',`${SERVER_URL}/add-employee`,reqBody)
}

export const getAllEmployeeAPI=async()=>{
    return await commonAPI('get',`${SERVER_URL}/all-employees`)
}

export const updateEmployeeAPI=async(id,reqBody)=>{
    return await commonAPI('put',`${SERVER_URL}/edit-employee/${id}`,reqBody)
}

export const deleteEmployeeAPI=async(id)=>{
    return await commonAPI('delete',`${SERVER_URL}/delete-employee/${id}`,{})
}