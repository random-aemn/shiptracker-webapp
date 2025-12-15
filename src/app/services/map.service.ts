import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  constructor(private http: HttpClient) { }

  getChesapeakeBayOutline() {
    return this.http.get('./cboutline.json');

  }
}
