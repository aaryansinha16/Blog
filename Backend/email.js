const nodemailer = require("nodemailer")

const username = "alan.wyman62@ethereal.email"
const password = "3c5S6zNs9b8G1QzjQx"
const name = "Alan Wyman"

// Transport
const transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: username,
        pass: password
    },

})

transport.sendMail({
    to:"aaryansinha16@.com",
    from: "hello@facebook.com",
    subject: "Your account created successfully",
    text: "Thank you for signing up"
})
.then(() => {
    console.log("Email sent successfully")
})