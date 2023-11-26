import express from 'express';
import cors from 'cors';
import myRoute from './routes/myRoute';

const app = express();
const port = 3001;
const corsSettings = cors({
    origin: true,
    credentials: true
});

app.use(corsSettings);
app.use(express.json());
app.use('/', myRoute);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});