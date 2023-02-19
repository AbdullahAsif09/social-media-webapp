const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const findUser = await User.findOne({email:req.body.email})
    if (findUser) {
    res.status(403).json("User already exists");  
    } else {
      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
  
      //save user and respond
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(403).json(err);
    console.log(err);
  }
});

//LOGIN 
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json("wrong credentials");
      }
      const {password,...others} = user._doc
      res.status(200).json(others);
    } else {
      res.status(400).json("user not found");
    }
  } catch (err) {
    res.status(403).json(err);
  }
});

module.exports = router;
