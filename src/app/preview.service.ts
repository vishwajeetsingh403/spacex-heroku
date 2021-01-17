import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  private all_url = 'https://api.spacexdata.com/v3/launches?limit=100';

  constructor(private http: HttpClient) {}

  //To get all the program list
  getPrograms(){
    return this.http.get(this.all_url);
  }

}
