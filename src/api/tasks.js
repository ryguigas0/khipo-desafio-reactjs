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

export async function updateTask(token, taskId, projectId, title, description, assignedMemberId, status) {
    let body = {}

    if (title) {
        body.title = title
    }

    if (description) {
        body.description = description
    }

    if (assignedMemberId) {
        body.assignedMemberId = assignedMemberId
    }

    if (status) {
        body.status = status
    }

    try {
        const resp = await axios.put("/projects/" + projectId + "/tasks/" + taskId, body, axiosConfig(token))

        return resp.data
    } catch (error) {
        console.error(error.response)
    }
}

export async function deleteTask(token, taskId, projectId) {
    try {
        const resp = await axios.delete("/projects/" + projectId + "/tasks/" + taskId, axiosConfig(token))

        return resp.data
    } catch (error) {
        console.error(error.response)
    }
}