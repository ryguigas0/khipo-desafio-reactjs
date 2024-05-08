import axios from 'axios'

import axiosConfig from './axiosConfig'

const mockAPI = process.env.REACT_APP_MOCK_API


export async function getProjectList(token) {
    try {
        const resp = await axios.get("/projects/", axiosConfig(token))

        return resp.data
    } catch (error) {
        return error.response
    }
}

export async function createProject(token, name, description) {
    try {
        const resp = await axios.post("/projects/", {
            name: name,
            description: description
        }, axiosConfig(token))

        return resp.data
    } catch (error) {
        return error.response
    }
}

export async function updateProject(token, projectId, name, description) {
    try {
        const resp = await axios.put("/projects/" + projectId, {
            name: name,
            description: description
        }, axiosConfig(token))

        return resp.data
    } catch (error) {
        return error.response
    }
}

export async function deleteProject(token, projectId) {
    try {
        const resp = await axios.delete("/projects/" + projectId, axiosConfig(token))

        return resp.data
    } catch (error) {
        return error.response
    }
}

