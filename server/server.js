import express from 'express'; // type module
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors()); // allow frontend to connect with backend

// api endpoint

app.use('/api/admin' , adminRouter); 


app.get('/' , (req , res)=> {
   res.send('Api is Working on PORT 4000');
})



// Listening on PORT 4000
app.listen(port , () => {
   console.log("Server is running on PORT",port);
})
