import express from 'express';
import buses from './buses.js';

const routes = express();

routes.use('/buses', buses);

export default routes;
