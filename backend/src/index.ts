import express, { Request } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/expense_tracker')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

app.listen(4000, () => console.log(`Express server running on port 4000`));
