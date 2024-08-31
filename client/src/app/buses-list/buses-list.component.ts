import { Component } from '@angular/core';
import { BusesService } from '../buses.service';

@Component({
  selector: 'app-buses-list',
  standalone: true,
  imports: [],
  templateUrl: './buses-list.component.html',
  styleUrl: './buses-list.component.css'
})
export class BusesListComponent {

  constructor(private busesService: BusesService) {}

}
