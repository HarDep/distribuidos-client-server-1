import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT || 3200;

const host = process.env.HOST || 'localhost';

const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:4200';

app.use(cors({
    origin: clientOrigin
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
