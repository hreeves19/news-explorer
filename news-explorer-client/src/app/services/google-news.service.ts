import { Injectable } from '@angular/core';
import { range } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleNewsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllHeadlines() {
    return this.http.get(`${environment.expressServerName}google/headlines`);
  }

  searchHeadlines(search: any) {
    return this.http.post(`${environment.expressServerName}google/searchHeadlines`, search);
  }
}
