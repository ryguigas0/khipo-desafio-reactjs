export default function axiosConfig(token) {
    return {
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "authorization": `Bearer ${token}`
        }
    }
}