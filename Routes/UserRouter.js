const express = require("express");
const router = express.Router();
const user = require("../models/users");
const { jwtauthMiddlewear, generateToken } = require("../jwt");

router.post("/signup", async (req, res) => {
  const data = req.body;
  const newUser = new user(data);
  const response = await newUser.save();
  console.log("data saved", response);
  const payload = {
    id: response.id,
  };
  console.log(JSON.stringify(payload));
  const token = generateToken(payload);
  console.log("token is", token);
  res.status(200).json({ response: response, token: token });
});

router.post("/login", async (req, res) => {
  const { AadharCardNo, password } = req.body;
  const user = await user.findOne({ AadharCardNo });
  if (!user || (await user.comparePassword(password))) {
    return res.status(411).json({ error: "Invalid credtionals" });
  }
  const payload = {
    id: user.id,
  };
  const token = generateToken(payload);
  res.json({ token });
});

router.get("/profile", jwtauthMiddlewear, async (req, res) => {
  try {
    const UserData = req.user;
    const UserId = UserData.id;
    const user = await user.findById(UserId);
    res.status(200).json({ user });
  } catch (error) {
    console.log(err);
    res.status(401).json({ error: "Invalid token" });
  }
});

router.put("/profile/password",async(req,res)=>{
    const UserId =req.user;
    const{CurrentPassword,newPassword}=req.body
    const user = await user.findById(UserId); 
    if( !(await user.comparePassword(CurrentPassword))){
        return res.status(401).json({error:"invalid username or password"})
    }
    user.password = newPassword
    await user.save()
    console.log("password updated")
    res.status(200).json({message:"password updated"})
})

module.exports = router