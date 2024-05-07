import axios from 'axios'

const mockAPI = process.env.REACT_APP_MOCK_API


export async function getProjectList(token) {
    try {
        const resp = await axios.get("/projects/", axiosConfig(token))

        return resp.data
    } catch (error) {
        return error.response
    }

}

function axiosConfig(token) {
    return {
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "authorization": `Bearer ${token}`
        }
    }
}