import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para los pipes como 'date'
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel
import { BusesService } from '../buses.service';
import { Bus } from '../bus';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-buses-create-edit',
  standalone: true,   // Indica que es un componente independiente

  imports: [CommonModule, FormsModule],  // Importa CommonModule y FormsModule
  templateUrl: './buses-create-edit.component.html',
  styleUrls: ['./buses-create-edit.component.css']
})
export class BusesCreateEditComponent {
  bus: Bus = new Bus();  // Nuevo bus para registrar
  
  title:string = ''
  busPlate:string = ''

  constructor(private busesService: BusesService, private route:ActivatedRoute, private router:Router) {}

    ngOnInit(){
        this.busPlate = this.route.snapshot.params['busPlate'];
        if (this.busPlate) {
            this.title = 'editar'
            this.busesService.getBus(this.busPlate).pipe(
                catchError(error => {
                    this.router.navigate(['buses'])
                    return of()
                })
            ).subscribe(data => this.bus = data.bus!)
        }
        else {
            this.title = 'registrar'
        }
    }

  registerBus() {
  }

  onSubmit(){

  }
}



