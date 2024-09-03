import { Component } from '@angular/core';
import { BusesService } from '../buses.service';
import { Bus } from '../bus';

@Component({
  selector: 'app-bus-info',
  standalone: true,
  imports: [],
  templateUrl: './bus-info.component.html',
  styleUrl: './bus-info.component.css'
})
export class BusInfoComponent {
  bus: Bus = new Bus();  // Instancia de la clase Bus
  constructor(private busesService: BusesService) {}
  saveBus() {
    if (!this.bus.editedTimes) {
      this.bus.editedTimes = 0;
    }
    this.bus.editedTimes++;
    console.log('Bus saved:', this.bus);
  }
}



export class BusComponent {
}
