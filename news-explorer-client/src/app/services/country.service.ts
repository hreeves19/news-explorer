import { Injectable } from '@angular/core';
import { range } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCountries() {
    return this.http.get(`${environment.expressServerName}countries/`);
  }
}
