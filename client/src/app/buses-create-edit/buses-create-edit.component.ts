import { Component } from '@angular/core';
import { BusesService } from '../buses.service';

@Component({
  selector: 'app-buses-create-edit',
  standalone: true,
  imports: [],
  templateUrl: './buses-create-edit.component.html',
  styleUrl: './buses-create-edit.component.css'
})
export class BusesCreateEditComponent {

  constructor(private busesService: BusesService) {}

}
