import express from 'express';
import * as busServices from '../services/buses-service.js';

const buses = express();

buses.get('/:busPlate', (req, res) => {
    const { busPlate } = req.params;
    if(!busPlate){
        res.status(400).json({error : 'No se Admiten valores vacios',
            successful : false
        });
        return;
    }
    var busFound= busServices.getBusBybusPlate(busPlate);
    if(!busFound){
        res.status(400).json({message : `El bus con placa ${busPlate} no existe`,
            successful : false
        });
        return;
    }
    var busPlateFound = busFound.busPlate;
    var busArriveFound = busFound.arriveDateTime;
    var busEditedTimesFound = busFound.editedTimes;
    res.status(200).json({
        message : `El bus con placa ${busPlate} no existe`,
            successful : false,
            bus:{
        busPlate: busPlateFound,
        arriveDateTime: busArriveFound,
        editedTimes: busEditedTimesFound
        
    }});
});

buses.get('/', (req, res) => {
    let buses = busServices.getBuses();

    res.status(200).json(buses);
});

buses.post('/', (req, res) => {
    const { busPlate, arriveDateTime } = req.body;

    if (!busPlate || !arriveDateTime) {
         res.status(400).json({ message: 'Se necesita la placa y el tiempo de llegada',
            successful : false
          });
         return;
    }

    if (busServices.existBus(busPlate)) {
         res.status(400).json({ message: `El bus con placa ${busPlate} ya existe`, 
            successful : false
         });
         return;
    }

    const newBus = {
        busPlate,
        arriveDateTime
    };

    busServices.saveBus(newBus);
  
    res.status(200).json({
      message : `El bus con placa: ${busPlate} Creado con Exito`,
      successful : true
    });

});

buses.patch('/:busPlate', (req, res) => {
    const { busPlate } = req.params;
    const { arriveDateTime } = req.body;

    let exist = busServices.existBus(busPlate);
    if(!exist) {
        res.status(404).json({ message: `El bus con placa ${busPlate} no existe` });
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
       message : `El bus  con placa ${busPlate} se ha actualizado con exito`,
       successful : true
    });
});

buses.delete('/:busPlate', (req, res) => {
    const { busPlate } = req.params;

    let exist = busServices.existBus(busPlate);
    if(!exist) {
        res.status(404).json({ message: 'El bus no existe', 
            successful : false
        });
        return;
    }

    busServices.deleteBus(busPlate);
    res.status(200).json({
        message : `El bus con placa:  ${busPlate} ha sido eliminado`,
        successful : true
    });
});

export default buses;