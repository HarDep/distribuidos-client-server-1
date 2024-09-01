import express from 'express';
import * as busServices from '../services/buses-service.js';

const buses = express();

buses.get('/:busPlate', (req, res) => {
    const { busPlate } = req.params;

    //validar datos

    //obtener datos

    //devolver
    res.status(200).json({
        busPlate: busPlate,
        arriveDateTime: '2022-10-10T00:00:00.000Z',
        editedTimes: 0
    });
});

buses.get('/', (req, res) => {
    //obtener datos - ejs
    let buses = busServices.getBuses();

    //devolver
    res.status(200).json(buses);
});

buses.post('/', (req, res) => {
    const { busPlate, arriveDateTime } = req.body;

    //validar datos

    //ejs validation and send error
    if(!busPlate || !arriveDateTime) {
        res.status(400).json({ message: 'The bus plate is required' });
        return;
    }

    //guardar datos

    //devolver bus creado
    res.status(201).json({
        message : `Bus ${busPlate} created with arrive time ${arriveDateTime}`,
        successful : true,
        bus : {
            busPlate : busPlate,
            arriveDateTime : arriveDateTime,
            editedTimes : 0
        }
    });
});

buses.patch('/:busPlate', (req, res) => {
    const { busPlate } = req.params;
    const { arriveDateTime } = req.body;

    //validar datos
    let exist = busServices.existBus(busPlate);
    if(!exist) {
        res.status(404).json({ message: 'El bus no existe' });
        return;
    }

    //actualizar fecha de llegada y veces editado

    //devolver bus actualizado
    res.status(200).json({
        message : `Bus ${busPlate} updated with arrive time ${arriveDateTime}`,
        successful : true,
        bus : {
            busPlate : busPlate,
            arriveDateTime : arriveDateTime,
            editedTimes : 1
        }
    });
});

buses.delete('/:busPlate', (req, res) => {
    const { busPlate } = req.params;

    //validar datos

    //borrar datos

    //devolver bus borrado
    res.status(200).json({
        message : `Bus ${busPlate} deleted`,
        successful : true
    });
});

export default buses;