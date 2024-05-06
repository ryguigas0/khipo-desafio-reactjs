const mockAPI = process.env.REACT_APP_MOCK_API

export function createUser(email, password) {
    console.log("CREATING USER")
    console.log({
        mockAPI, email, password
    })
}

export function changePassword(email, oldPassword, newPassword) {
    console.log("CHANGING PASSWORD")
    console.log({
        mockAPI, email, oldPassword, newPassword
    })
}

export function loginUser(email, password) {
    console.log("LOGGING IN")
    console.log({
        mockAPI, email, password
    })
}