const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/User.model");
const jwt = require("jsonwebtoken")
const cors = require("cors")

const app = express();
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    "SECRET1234",
    {
        expiresIn: "7 days"
    })
    res.send({message : "Login success", token})
})

app.get("/users/:id", async (req,res) => {
  const {id} = req.params
  const user = await UserModel.findById(id)

  const token = req.headers["authorization"]
  if(!token){
    return res.status(401).send("Unauthorized")
  }
  try{
    const verification = jwt.verify(token, "SECRET1234")
    const user = await UserModel.findById(id)
    return res.send(user)
  } catch{
    return res.status(401).send("Token is invalid")
  }

  res.send(user)
})

mongoose.connect("mongodb://127.0.0.1:27017/nem201").then(() => {
  app.listen(8080, () => {
    console.log("server started at http://localhost:8080");
  });
}).catch((e) => console.log('THIS IS ERROR', e))