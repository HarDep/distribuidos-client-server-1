import express from 'express';
import * as busServices from '../services/buses-service.js';

const buses = express();

buses.get('/:busPlate', (req, res) => {
    const { busPlate } = req.params;
    if(!busPlate){
        res.status(400).json({error : 'No se Admiten valores vacios'});
    }
    //validar datos
    var busFound= busServices.getBusBybusPlate(busPlate);
    if(!busFound){
        res.status(400).json({error : 'El bus no existe'});
    }
    //obtener datos
    var busPlateFound = busFound.busPlate;
    var busArriveFound = busFound.arriveDateTime;
    var busEditedTimesFound = busFound.editedTimes;
    //devolver
    res.status(200).json({
        busPlate: busPlateFound,
        arriveDateTime: busArriveFound,
        editedTimes: busEditedTimesFound
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

    // Validar datos
    if (!busPlate || !arriveDateTime) {
        return res.status(400).json({ message: 'Bus plate and arrival time are required' });
    }

    // Verificar si el bus ya existe
    if (busServices.existBus(busPlate)) {
        return res.status(400).json({ message: 'The bus already exists' });
    }

    // Guardar datos
    const newBus = {
        busPlate,
        arriveDateTime
    };
    busServices.saveBus(newBus);

    // Devolver bus creado
    return res.status(201).json({
        message: `Bus ${busPlate} created with arrival time ${arriveDateTime}`,
        successful: true,
        bus: {
            busPlate,
            arriveDateTime,
            editedTimes: 0
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