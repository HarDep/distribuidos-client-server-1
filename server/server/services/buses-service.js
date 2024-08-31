let buses = [
    {
        busPlate: 'AAAA-123',
        arriveDateTime: '2022-10-10T00:00:00.000Z',
        editedTimes: 3
    },
    {
        busPlate: 'BBBB-123',
        arriveDateTime: '2022-10-10T00:00:00.000Z',
        editedTimes: 2
    }
];

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
    const { busPlate, editedTimes } = bus;
    buses[index] = {
        busPlate: busPlate,
        arriveDateTime: bus.arriveDateTime,
        editedTimes: editedTimes + 1
    };
}

export function deleteBus(busPlate) {
    const index = buses.findIndex(b => b.busPlate === busPlate);
    buses.splice(index, 1);
}

export function existBus(busPlate) {
    return !!buses.find(b => b.busPlate === busPlate);
}
