import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// mongodb connection
import connectDb from './db/db.js'

//clerk
import { clerkMiddleware } from '@clerk/express'

//ingest
import { serve } from "inngest/express";
import { inngest, functions } from "./ingest/index.js"

const app = express()


// Middlewares
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

// API Routes
app.get('/',(req,res)=>{
  res.send(`server is live`)
})
app.use("/api/inngest", serve({ client: inngest, functions }));

await connectDb()
.then(()=>{
  app.listen(process.env.PORT || 4000 ,()=>{
    console.log(`server listening at http://localhost:${process.env.PORT}`)
  })
})
.catch(error =>{
  console.log(error)
})

