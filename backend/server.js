import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js';
import authRoutes from './routes/user.route.js'
import noteRoutes from './routes/note.route.js'
import path from 'path';


const app = express();
dotenv.config()

const __dirname = path.resolve();


// middlewares : 
app.use(express.json())
app.use(cors())


// Routes : 
app.use('/api/users', authRoutes)           // postman:  http://localhost:3003/api/users/register
app.use('/api/notes', noteRoutes)               


// THE PRODUCTION BLOCK
if (process.env.NODE_ENV === 'production') {
  // 1. Serve the static files from the React app
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')))

  // 2. Handle any requests that don't match your API routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}


// connect database : 

connectDB().then(() => {
    const port = process.env.PORT || 3003
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    })
}).catch((error) => {
    console.log("Error : ", error); 
})