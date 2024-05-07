import axios from 'axios'

const mockAPI = process.env.REACT_APP_MOCK_API

const axiosDefaultConfig = {
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
}


export async function createUser(name, email, password) {
    try {
        const resp = await axios.post("/users/", {
            name: name,
            email: email,
            password: password,
        }, axiosDefaultConfig)    

        
        return resp.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

export async function changePassword(email, oldPassword, newPassword) {
    console.log("CHANGING PASSWORD")
    console.log({
        mockAPI, email, oldPassword, newPassword
    })
}

export async function loginUser(email, password) {
    try {
        const resp = await axios.post("/auth/token/", {
            email: email,
            password: password
        }, axiosDefaultConfig)    
        
        return resp.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}