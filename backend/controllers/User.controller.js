const User = require("../models/User.model");

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