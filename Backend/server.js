import express from 'express';
import dotenv from 'dotenv';
import CustomerRouter from './route/customer.js';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;
app.use(express.json());
app.use('/api/customer', CustomerRouter);




app.get('/', (req, res) => {
    res.send('Hello World');
});     

app.listen(port, () => {
    console.log('Server is running on port 3000');
});

