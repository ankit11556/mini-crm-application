const express = require('express');
const app = express();
const dotenv = require('dotenv')
const connectDB = require('./config/db.conf')
const cors = require('cors')
const cookieParser = require('cookie-parser') 

dotenv.config();

app.use(cors())
app.use(express.json())
app.use(cookieParser())

const authRoutes = require('./routes/Auth.routes');
const customerRoutes = require('./routes/Customer.routes')

app.use("/api/auth",authRoutes)
app.use("/api/customers",customerRoutes)

app.get("/",(req,res)=>{
  res.send("API is running...")
})

app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status(500).send('Something broke!')
})

const PORT = process.env.PORT || 5000

connectDB().then(()=>{
app.listen(PORT, ()=>{
  console.log(`server is running at http://localhost:${PORT}`);
})
})