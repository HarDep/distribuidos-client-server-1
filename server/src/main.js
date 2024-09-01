import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT || 3200;

const host = process.env.HOST || 'localhost';

const clienthost = process.env.CLIENT_HOST || 'localhost';

app.use(cors({
    origin: `http://${clienthost}:4200`,
}));

app.use(express.json());

app.use('/api/v1', routes);

app.use((req, res) =>{
    res.status(404).json({
        path: req.path,
        message: 'Resource not found'
    });
});

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});
