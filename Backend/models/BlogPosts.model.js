const { Schema, model } = require("mongoose");

const BlogPostSchema = new Schema({
    author: String,
    published_at: String,
    likes: Number,
    comments: Array,
    title: String,
    blog_content: String,
    image: String,
    tags: String
})

const BlogModel = model( "blogPost" ,BlogPostSchema)

module.exports = BlogModel