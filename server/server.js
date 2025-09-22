import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './db/db.js';
import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';
import { inngest, functions } from './ingest/index.js';

const app = express();

// 1️⃣ Inngest webhook route MUST come first before any body parser middleware
app.post('/api/inngest', serve({ client: inngest, functions }));

// 2️⃣ Middlewares for other routes
app.use(cors());
app.use(clerkMiddleware());
app.use(express.json()); // only needed for your own JSON APIs

// 3️⃣ Example root route
app.get('/', (req, res) => res.send("Server is live"));

// 4️⃣ Other API routes (example)
app.post('/api/users', async (req, res) => {
  // You can safely parse JSON here
  const user = req.body;
  // save to DB logic...
  res.status(201).json({ message: "User created", user });
});

// 5️⃣ Connect MongoDB and start server
const port = process.env.PORT || 4000;
try {
  await connectDb();
  app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
} catch (err) {
  console.error("Failed to start server:", err);
}
