const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
name: {
  type: String,
  required: true
},
email: {
  type: String, 
  required: true,
  unique: true
},
passwordHash: {
  type: String,
  required: true
},
role: {
  type: String,
  enum: ["Admin","User"],
  default: "User"
}
},{timestamps: true})

//password hash before save user data
userSchema.pre('save', async function (next) {
  if(!this.isModified("passwordHash")){
    return next()
  }
  try {
    this.passwordHash = await bcrypt.hash(this.passwordHash,10);
    next()
  } catch (error) {
    next(error)
  }
})

//password compare before login
userSchema.methods.isPasswordCompare = async function (password) {
  try {
    return await bcrypt.compare(password,this.passwordHash)
  } catch (error) {
    throw new Error("password comparision failed");
    
  }
}

const User = mongoose.model("User",userSchema);
module.exports = User