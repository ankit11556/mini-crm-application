const User = require("../models/User.model");
const generateCookies = require("../utils/GenerateCookies.utils");
const generateToken = require("../utils/GenerateToken.utils");

// register controller
exports.registerController = async (req,res) => {
  try {
    const {name, email, passwordHash} = req.body;
    if (!name || !email || !passwordHash) {
      return res.status(400).json({message: "All fields is required"});
    }

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: "User aleardy exists"})
    }

   const user =  await User.create({name, email, passwordHash});

   res.status(201).json({message: "Registration successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
   })
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

//login controller
exports.loginController = async (req,res) => {
  try {
    const {email, passwordHash} = req.body;
    if (!email || !passwordHash) {
      return res.status(400).json({message: "All fields is required"})
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({message: "User not found. Please register first."})
    }

    const isMatchPassword = await user.isPasswordCompare(passwordHash)
    if (!isMatchPassword) {
      return res.status(403).json({message: "Invalid credentials"})
    }

    const token = generateToken(user._id)
    generateCookies(res,token)
    res.status(201).json({message: "login successful",
      user: {
      id: user._id,
      name: user.name,
      email: user.email
      }
    })

  } catch (error) {
    res.status(500).json({message: 'login failed',error: error.message})
  }
}