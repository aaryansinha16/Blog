const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/User.model");
const BlacklistModel = require("./models/Blacklist.model")
const jwt = require("jsonwebtoken")
const cors = require("cors");
const { find } = require("./models/User.model");
require("dotenv").config()

const MAIN_KEY = process.env.MAIN_KEY
const REFRESH_KEY = process.env.REFRESH_KEY

const MAIN_EXP = process.env.MAIN_EXP
const REFRESH_EXP = process.env.REFRESH_EXP

const app = express();
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const blacklist = []

app.get("/", (req, res) => {
  res.send("Hello World!");
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
        expiresIn: MAIN_EXP
    })

    const refresh = jwt.sign({email: user.email, id: user._id, age: user.age}, 
      REFRESH_KEY,
      {
        expiresIn: REFRESH_EXP
      }
      )
    res.send({message : "Login success", token, user, refresh})
})

app.get("/users/:id", async (req,res) => {
  const {id} = req.params
  const user = await UserModel.findById(id)

  const token = req.headers["authorization"]

  // TODO: Do this in middlewares
  let blacklist = await BlacklistModel.findOne({mainToken: token})
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
        res.send("Token is already expired")
      }
      let test = await BlacklistModel.create({mainToken: token})
    }
    return res.status(401).send("Token is invalid")
  }

  res.send(user)
})


app.post("/logout" ,async (req, res) => {
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


app.post("/refresh", async (req, res) => {
  const refreshToken = req.headers.authorization
  console.log(refreshToken, 'this is refresh token')
  try {
    const data = jwt.verify(refreshToken, REFRESH_KEY);

    console.log(data,'this is verify data');

    const mainToken = jwt.sign({email: data.email, age: data.age, id: data.id}, MAIN_KEY, {
      expiresIn: MAIN_EXP,
    });
    console.log(jwt.decode(mainToken),'this is decode');
    res.send({ maintoken: mainToken });
  } catch (e) {
    res.send("refresh token is invalid");
  }

  // res.send(token)
})

mongoose.connect("mongodb://127.0.0.1:27017/nem201").then(() => {
  app.listen(8080, () => {
    console.log("server started at http://localhost:8080");
  });
}).catch((e) => console.log('THIS IS ERROR', e))