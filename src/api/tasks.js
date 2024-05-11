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

export async function createTask(token, projectId, title, description, tags, assignedMemberId) {
    let body = {
        title: title
    }

    if (description) {
        body.description = description
    }

    if (tags) {
        body.tags = tags
    }

    if (assignedMemberId) {
        body.assignedMemberId = assignedMemberId
    }

    try {
        const resp = await axios.post("/projects/" + projectId + "/tasks/", body, axiosConfig(token))

        return resp.data
    } catch (error) {
        return error.response
    }
}

export async function getTask(token, projectId, taskId) {
    try {
        const resp = await axios.get("/projects/" + projectId + "/tasks/" + taskId, axiosConfig(token))

        return resp.data
    } catch (error) {
        return error.response
    }
}