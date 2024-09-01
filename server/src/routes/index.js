import express from 'express';
import buses from '../controllers/buses.js';

const routes = express();

routes.use('/buses', buses);

export default routes;
