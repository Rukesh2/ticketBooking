import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './db/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./ingest/index.js";

const app = express();

// Middlewares
app.use(cors());
app.use(clerkMiddleware());

// Root route
app.get('/', (req, res) => res.send("server is live"));

// Inngest route - use raw parser for signature verification
app.use(
  '/api/inngest',
  express.raw({ type: 'application/json' }),
  serve({ client: inngest, functions })
);

// Connect DB and start server
const port = process.env.PORT || 4000;

await connectDb()
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
