import express from 'express'
import { connectDB } from './config/db.js'
import { authRoute } from './routes/authRoutes.js'
import { candidateRoute } from './routes/candidateRoutes.js'
import { recruiterRoute } from './routes/recruiterRoutes.js'
import { adminRoute } from './routes/adminRoutes.js'

const app=express()
const PORT=5000

await connectDB();

app.use(express.json())

app.use("/",authRoute)
app.use("/candidate",candidateRoute)
app.use("/recruiter",recruiterRoute)
app.use("/admin",adminRoute)

app.listen(PORT,()=>{
    console.log("Server is Running on PORT: ",PORT);
})