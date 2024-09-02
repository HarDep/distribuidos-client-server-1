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
        return;
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
         res.status(400).json({ message: 'Bus plate and arrival time are required' });
         return;
    }

    // Verificar si el bus ya existe
    if (busServices.existBus(busPlate)) {
         res.status(400).json({ message: 'The bus already exists' });
         return;
    }

    // Guardar datos
    const newBus = {
        busPlate,
        arriveDateTime
    };

    busServices.saveBus(newBus);
  
    //devolver
    res.status(200).json({
        busPlate: busPlate,
        arriveDateTime: arriveDateTime,
        editedTimes: 0

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
    const newBus = {
        busPlate,
        arriveDateTime
    };
    busServices.updateBus(newBus);
    //devolver bus actualizado
    const busFound = busServices.getBusBybusPlate(busPlate);
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

buses.delete('/:busPlate', (req, res) => {
    const { busPlate } = req.params;

    //validar datos
    let exist = busServices.existBus(busPlate);
    if(!exist) {
        res.status(404).json({ message: 'El bus no existe' });
        return;
    }
    //borrar datos
    busServices.deleteBus(busPlate);
    //devolver bus borrado
    res.status(200).json({
        message : `Bus ${busPlate} deleted`,
        successful : true
    });
});

export default buses;