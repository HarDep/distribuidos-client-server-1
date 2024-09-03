import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusesService } from '../buses.service';
import { Bus } from '../bus';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-buses-create-edit',
  standalone: true,   

  imports: [CommonModule, FormsModule, RouterLink],  
  templateUrl: './buses-create-edit.component.html',
  styleUrls: ['./buses-create-edit.component.css']
})
export class BusesCreateEditComponent {
  bus: Bus = new Bus();  
  
  title:string = ''
  busPlate:string = ''
  isEdit:boolean = false;
  message:string = ''

  constructor(private busesService: BusesService, private route:ActivatedRoute, private router:Router) {}

    ngOnInit(){
        this.busPlate = this.route.snapshot.params['busPlate'];
        if (this.busPlate) {
            this.isEdit = true
            this.title = 'editar'
            this.busesService.getBus(this.busPlate).pipe(
                catchError(error => {
                    this.router.navigate(['buses'])
                    return of()
                })
            ).subscribe(data => this.bus = data.bus!)
        }
        else {
            this.isEdit = false
            this.title = 'registrar'
        }
    }

  registerBus() {
    this.busesService.createBus(this.bus).pipe(
        catchError(error => {
            this.message = 'Algo a salido mal no se pudo realizar a accion, intentalo mas tarde'
            return of()
        })
    ).subscribe(data => this.message = data.message)
  }

  editBus(){
    this.busesService.updateBus(this.bus, this.busPlate).pipe(
        catchError(error => {
            this.message = 'Algo a salido mal no se pudo realizar a accion, intentalo mas tarde'
            return of()
        })
    ).subscribe(data => this.message = data.message)

  }

  onSubmit(){
    if (this.isEdit) {
        this.editBus()
    }
    else {
        this.registerBus()
    }
}
}



