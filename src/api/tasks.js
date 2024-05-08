import axios from 'axios'
import axiosConfig from './axiosConfig'


export async function getTaskList(token, projectId) {
    try {
        const resp = await axios.get("/projects/" + projectId + "/tasks/", axiosConfig(token))

        return resp.data
    } catch (error) {
        return error.response
    }
}