import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './db/db.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./ingest/index.js"

const app = express()
const PORT = process.env.PORT || 4000

await connectDB()

app.use(clerkMiddleware())
app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
  res.send(`server is live`)
})
app.use("/api/inngest", serve({ client: inngest, functions }));




app.listen(PORT,()=>{
  console.log(`server is running at http://localhost:${PORT}`);
})
