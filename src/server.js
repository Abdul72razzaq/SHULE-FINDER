import express from 'express';
import schoolroutes from './routes/schoolroutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json());

app.use("/api/schools",schoolroutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
