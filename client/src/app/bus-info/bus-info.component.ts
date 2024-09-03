import { Component, Inject, LOCALE_ID } from '@angular/core';
import { BusesService } from '../buses.service';
import { Bus } from '../bus';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-bus-info',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bus-info.component.html',
  styleUrl: './bus-info.component.css'
})
export class BusInfoComponent {
  bus: Bus = new Bus();
  busPlate:string = ''

  formatingDate: Function = (date:Date) => formatDate(date, "dd/MM/YYYY hh:mm a", this.locale);

  constructor(private busesService: BusesService, private route:ActivatedRoute, private router:Router, @Inject(LOCALE_ID) private locale: string) {}

  ngOnInit(){
    this.busPlate = this.route.snapshot.params['busPlate'];
    this.busesService.getBus(this.busPlate).pipe(
        catchError(error => {
            this.router.navigate(['buses'])
            return of()
        })
    ).subscribe(data => this.bus = data.bus!)
  }

}



export class BusComponent {
}
