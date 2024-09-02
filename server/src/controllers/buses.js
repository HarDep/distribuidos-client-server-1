import express from 'express';
import * as busServices from '../services/buses-service.js';

const buses = express();

buses.get('/:busPlate', (req, res) => {
    const { busPlate } = req.params;
    if(!busPlate){
        res.status(400).json({error : 'No se Admiten valores vacios'});
    }
    
    var busFound= busServices.getBusBybusPlate(busPlate);
    if(!busFound){
        res.status(400).json({error : 'El bus no existe'});
        return;
    }
    
    var busPlateFound = busFound.busPlate;
    var busArriveFound = busFound.arriveDateTime;
    var busEditedTimesFound = busFound.editedTimes;
    
    res.status(200).json({
        busPlate: busPlateFound,
        arriveDateTime: busArriveFound,
        editedTimes: busEditedTimesFound
    });
});

buses.get('/', (req, res) => {
    let buses = busServices.getBuses();

    res.status(200).json(buses);
});

buses.post('/', (req, res) => {
    const { busPlate, arriveDateTime } = req.body;

    if (!busPlate || !arriveDateTime) {
         res.status(400).json({ message: 'Placa y fecha de llegada son requeridos' });
         return;
    }

    if (busServices.existBus(busPlate)) {
         res.status(400).json({ message: 'El bus ya existe' });
         return;
    }

    const newBus = {
        busPlate,
        arriveDateTime
    };

    busServices.saveBus(newBus);
  
    res.status(200).json({
        message: 'Bus creado',
        successful: true,
        bus: {
        busPlate: busPlate,
        arriveDateTime: arriveDateTime,
        editedTimes: 0
    }});
});

buses.patch('/:busPlate', (req, res) => {
    const { busPlate } = req.params;
    const { arriveDateTime } = req.body;

    let exist = busServices.existBus(busPlate);
    if(!exist) {
        res.status(404).json({ message: 'El bus no existe' });
        return;
    }

    const newBus = {
        busPlate,
        arriveDateTime
    };
    busServices.updateBus(newBus);
    
    const busFound = busServices.getBusBybusPlate(busPlate);
    var busPlateFound = busFound.busPlate;
    var busArriveFound = busFound.arriveDateTime;
    var busEditedTimesFound = busFound.editedTimes;
    
    res.status(200).json({
        message: 'Bus actualizado',
        successful: true,
        bus: {
        busPlate: busPlateFound,
        arriveDateTime: busArriveFound,
        editedTimes: busEditedTimesFound
    }});
});

buses.delete('/:busPlate', (req, res) => {
    const { busPlate } = req.params;

    let exist = busServices.existBus(busPlate);
    if(!exist) {
        res.status(404).json({ message: 'El bus no existe' });
        return;
    }
    
    busServices.deleteBus(busPlate);
    
    res.status(200).json({
        message : `Bus ${busPlate} deleted`,
        successful : true
    });
});

export default buses;