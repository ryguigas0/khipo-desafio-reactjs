import axios from "axios"
import axiosConfig from "./axiosConfig"

export async function createTag(token, title, taskId, projectId) {
    let body = {
        title: title
    }

    try {
        const resp = await axios.post("/projects/" + projectId + "/tasks/" + taskId + "/tags/", body, axiosConfig(token))

        return resp.data
    } catch (error) {
        return error.response
    }
}

export async function deleteTag(token, tagId, taskId, projectId) {
    try {
        const resp = await axios.delete("/projects/" + projectId + "/tasks/" + taskId + "/tags/" + tagId, axiosConfig(token))

        return resp.data
    } catch (error) {
        return error.response
    }
}