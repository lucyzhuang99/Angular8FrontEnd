import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const localUrl = 'assets/data/smartphone.json';
var apiurl = 'http://localhost:56749/api/';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }     // Inject the ApiService to the constructor.

  getScheduleRestApi(url) {  
    return this.http.get(apiurl + url);
  }
}
