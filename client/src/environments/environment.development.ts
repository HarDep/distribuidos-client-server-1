
const port = process.env['SERVER_PORT'] || 3200;

const host = process.env['SERVER_HOST'] || 'localhost';

export const environment = {
    urlBuses: `http://${host}:${port}/api/v1/buses`,
};
