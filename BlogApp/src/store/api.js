import axios from 'axios'

export const postLogin = async(creds) => {
    console.log(creds, 'this is post login')
    let response = await axios.post("http://localhost:8080/login", creds)
    return response.data
}

export const postSignup = async(creds) => {
    let response = await axios.post("http://localhost:8080/signup", creds)
    return response.data
}