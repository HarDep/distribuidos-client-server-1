import { Component, Inject, LOCALE_ID } from '@angular/core';
import { BusesService } from '../buses.service';
import { Bus } from '../bus';
import { formatDate, NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-buses-list',
  standalone: true,
  imports: [NgFor ],
  templateUrl: './buses-list.component.html',
  styleUrl: './buses-list.component.css'
})
export class BusesListComponent {

  buses:Bus[] =[];
  plateToDelete:string = ''

  formatingDate: Function = (date:Date) => formatDate(date, "dd/MM/YYYY hh:mm a", this.locale);

  constructor(private busesService: BusesService, private router: Router, @Inject(LOCALE_ID) private locale: string) {}

  ngOnInit(){
    this.getBuses()
  }
  
  private getBuses(){
    this.busesService.getBuses ().subscribe(data => this.buses = data)
  }
  update(busPlate: string){
    this.router.navigate(['edit',busPlate])
  }

  deleteBefore(busPlate: string){
    this.plateToDelete = busPlate
  }

  deleteBus(){
    this.busesService.deleteBus(this.plateToDelete).subscribe(data => {
      console.log(data.message)
      this.getBuses()
    })
  }

  see(busPlate: string){
    this.router.navigate(['details',busPlate])
  }
}
