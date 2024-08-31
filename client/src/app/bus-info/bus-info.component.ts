import { Component } from '@angular/core';
import { BusesService } from '../buses.service';

@Component({
  selector: 'app-bus-info',
  standalone: true,
  imports: [],
  templateUrl: './bus-info.component.html',
  styleUrl: './bus-info.component.css'
})
export class BusInfoComponent {

  constructor(private busesService: BusesService) {}

}
