const dotenv = require("dotenv");
dotenv.config()
const express = require("express")
const cors = require('cors');
const app = express()
const connectDB = require('./db/db')
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes')
const cookieParser = require('cookie-parser')
const mapRoutes  = require('./routes/map.routes')
const rideRoutes = require('./routes/ride.routes')


connectDB()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("server is running")
})
app.use('/user', userRoutes);
app.use('/captain',captainRoutes);
app.use('/maps',mapRoutes);
app.use('/ride',rideRoutes)
module.exports= app;


 
