import axios from 'axios'

export const getBlogs = async() => {
    let response = await axios.get("http://localhost:8080/blogs")
    return response.data
}

export const getSingleBlog = async (id:any) => {
    let response = await axios.get(`http://localhost:8080/blogs/${id}`)

    return response.data
}