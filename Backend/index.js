const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/User.model");
const BlacklistModel = require("./models/Blacklist.model")
const BlogModel = require("./models/BlogPosts.model")
const jwt = require("jsonwebtoken")
const cors = require("cors");
const { find } = require("./models/User.model");
require("dotenv").config()
const nodemailer = require("nodemailer")
const otpGenerator = require("otp-generator")
const OtpModel = require("./models/Otp.model")

const MAIN_KEY = process.env.MAIN_KEY
const REFRESH_KEY = process.env.REFRESH_KEY

const MAIN_EXP = process.env.MAIN_EXP
const REFRESH_EXP = process.env.REFRESH_EXP

const app = express();
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const blacklist = []


// * Below is the code for email service(Ethereal) using nodemailer library.
//  ! The below credentials for Ethereal mail service is only temperory, thus should be updated from the website during use
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'kade97@ethereal.email',
      pass: 'kRghDANHK6gdVKbpPS'
  }
});


app.get("/", (req, res) => {
  res.send('<a href="https://github.com/login/oauth/authorize?client_id=985ffab9d1ad9a4aa4a0">Test</a>');
});

// Routes: Auth -> Signup, Signin
app.post("/signup", async (req, res) => {
  const { email, password, age } = req.body;
  console.log(email, password, age);

  const user = new UserModel({ email, password, age });
  await user.save();
  res.send("User Created Successfully");
});

app.post("/login",async (req, res) => {
    const {email, password} = req.body
    const user = await UserModel.findOne({email, password})
    if(!user){
        return res.send("Invalid Credentials")
    }

    const token = jwt.sign({email: user.email, age: user.age, id: user._id},
    MAIN_KEY,
    {
        expiresIn: "40 seconds"
    })

    const refresh = jwt.sign({email: user.email, id: user._id, age: user.age}, 
      REFRESH_KEY,
      {
        expiresIn: REFRESH_EXP
      }
      )
    res.send({message : "Login success", token,user, refresh})
})

app.get("/users/:id", async (req,res) => {
  const {id} = req.params
  const user = await UserModel.findById(id)

  const token = req.headers["authorization"]

  // TODO: Do this in middlewares
  let blacklist = await BlacklistModel.findOne({mainToken: token})
  // console.log(blacklist, 'this is blacklist from getid', token)
  if(blacklist){
    return res.status(401).send("Token is expired")
  }
  
  if(!token){
    return res.status(401).send("Unauthorized")
  }
  try{
    const verification = jwt.verify(token, MAIN_KEY)
    const user = await UserModel.findById(id)
    return res.send(user)
  } catch(e){
    if(e.message === 'jwt expired'){
      if(blacklist){
        return res.send("Token is already expired")
      }
      let test = await BlacklistModel.create({mainToken: token})
    }
    return res.status(401).send("Token is expired")
  }

  // res.send(user)
})


app.get("/logout" ,async (req, res) => {
  const token = req.headers['authorization']
  let findBlacklist = await BlacklistModel.findOne({mainToken: token})
  if(findBlacklist){
    return res.send({message: "Token already in blacklist", data: findBlacklist})
  }else{
    let blacklist = await BlacklistModel.create({mainToken: token})
    // blacklist.push(token)
    return res.send({message: "Token sent in blacklist", data: blacklist})
  }
})


app.get("/refresh", async (req, res) => {
  const refreshToken = req.headers.authorization
  console.log(refreshToken, 'this is refresh token')
  try {
    const data = jwt.verify(refreshToken, REFRESH_KEY);

    console.log(data,'this is verify data');

    const mainToken = jwt.sign({email: data.email, age: data.age, id: data.id}, MAIN_KEY, {
      expiresIn: "30 seconds",
    });
    console.log(jwt.decode(mainToken),'this is decode');
    res.send({ maintoken: mainToken });
  } catch (e) {
    res.send("refresh token is invalid");
  }

  // res.send(token)
})


/*
 * Below there are 2 endpoints of API, one for getting OTP and other for verifing OTP and reseting the password
 */
app.post("/reset-password/getotp", async (req, res) => {
  // ! Here the email should be in valid email format example-> example@abc.com , not like-> a.com etc.
  const { email } = req.body;
  //  ? For creating OTP's otpGenerator npm library is used ->
  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  transporter
    .sendMail({
      to: email,
      from: "b@b.com",
      subject: "reset-password OTP",
      text: `Your password reset request is successfull, OTP: ${otp}`,
    })
    .then(() => console.log("Email sent"));

  const otpDb = await OtpModel.create({ otp: otp, email: email });

  res.send(otp);
});

app.post("/reset-password/reset", async (req, res) => {
  const { email, newPassword, otp } = req.body;
  const testOtp = await OtpModel.findOne({ email, otp });
  // * Here if we find the same email with OTP in the otps collection then the can reset the password with new one
  if (testOtp) {
    const updatePass = await EmployeeModel.findOneAndUpdate(
      { email },
      { password: newPassword }
    );
    return res.send("Password updated");
  } else {
    return res.status(401).send("INVALID OTP");
  }
});



app.get("/github/callback" , (req, res) => {
  // console.log(req.query.code)
  res.send("signin with github success")
})



// ? All Blog API->
app.get("/blogs", async (req, res) => {
  let data = await BlogModel.find({})
  res.send(data)
})

app.get("/blogs/:id", async (req, res) => {
  // var title = req.params.title.replace("-", " ")
  var id = req.params.id
  let data = await BlogModel.findOne({_id: id})

  res.send(data)
})


mongoose.connect("mongodb://127.0.0.1:27017/nem201").then(() => {
  app.listen(8080, () => {
    console.log("server started at http://localhost:8080");
  });
}).catch((e) => console.log('THIS IS ERROR', e))