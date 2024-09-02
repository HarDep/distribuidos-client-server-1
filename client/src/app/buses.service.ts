import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Bus } from './bus';


interface BusResponse {
  message: string;
  successful: boolean;
  bus?: Bus;
}

@Injectable({
  providedIn: 'root'
})
export class BusesService {

  url:string = '';

  constructor(private httpClient: HttpClient) { 
    this.url = environment.urlBuses;
  }

  getBuses() : Observable<Bus[]> {
    return this.httpClient.get<Bus[]>(this.url);
  }

  getBus(busPlate: string) : Observable<Bus> {
    return this.httpClient.get<Bus>(`${this.url}/${busPlate}`);
  }

  createBus(bus: Bus) : Observable<BusResponse> {
    return this.httpClient.post<BusResponse>(this.url, bus);
  }

  updateBus(bus: Bus, busPlate: string) : Observable<BusResponse> {
    return this.httpClient.patch<BusResponse>(`${this.url}/${busPlate}`, bus);
  }

  deleteBus(busPlate: string) : Observable<BusResponse> {
    return this.httpClient.delete<BusResponse>(`${this.url}/${busPlate}`);
  }

}
