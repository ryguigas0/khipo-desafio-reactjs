import axios from 'axios'

import axiosConfig from './axiosConfig'


export async function addMember(token, projectId, memberEmail) {
    try {
        const resp = await axios.post(
            "/projects/" + projectId + "/members/",
            { memberEmail: memberEmail },
            axiosConfig(token))

        return resp.data
    } catch (error) {
        console.error(error)
        return error.response.data
    }
}