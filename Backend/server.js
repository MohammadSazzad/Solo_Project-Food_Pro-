import express from 'express';
import dotenv from 'dotenv';
import CustomerRouter from './route/customer.js';
import restuarantRouter from './route/restuarant.js';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;
app.use(express.json());
app.use('/api/customer', CustomerRouter);
app.use('/api/restuarant', restuarantRouter);




app.get('/', (req, res) => {
    res.send('Hello World');
});     

app.listen(port, () => {
    console.log('Server is running on port 3000');
});

