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

  getAllLanguages() {
    return this.http.get(`${environment.expressServerName}languages/`);
  }

  filterLanguages(languages: any) {
    let filtered = new Array();

    for (let [key, value] of Object.entries(languages)) {
      let itemKeys = Object.keys(value);

      let englishPosition = itemKeys.indexOf('en');
      let code = itemKeys.indexOf('639-1');

      if(code === -1 || englishPosition === -1) {
        continue;
      }

      filtered.push({name: value[itemKeys[englishPosition]][0], value: value[itemKeys[code]]});
    }

    filtered.sort(this.compare);
    console.log(filtered);
    return filtered;
  }

    compare( a, b ) {
    if ( a.name < b.name ) {
      return -1;
    }
    if ( a.name > b.name ) {
      return 1;
    }
    return 0;
  }
}
