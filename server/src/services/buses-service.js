let buses = [];

export function getBusBybusPlate(busPlate) {
    return buses.find(bus => bus.busPlate === busPlate);
}

export function getBuses() {
    return buses;
}


export function saveBus(bus) {
    buses.push({
        editedTimes: 0,
        ...bus
    });
}

export function updateBus(bus) {
    const index = buses.findIndex(b => b.busPlate === bus.busPlate);
    const busFound= getBusBybusPlate(bus.busPlate);

    buses[index] = {
        busPlate: busFound.busPlate,
        arriveDateTime: bus.arriveDateTime,
        editedTimes: busFound.editedTimes + 1
    };
}

export function deleteBus(busPlate) {
    const index = buses.findIndex(b => b.busPlate === busPlate);
    buses.splice(index, 1);
}

export function existBus(busPlate) {
    return !!buses.find(b => b.busPlate === busPlate);
}
