import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  private all_url = 'https://api.spacexdata.com/v3/launches?limit=100';

  constructor(private http: HttpClient) {}

  getPrograms(){
    return this.http.get(this.all_url);
  }

  getLaunchFilter(param){
    let launchUrl = `${this.all_url}&launch_success=${param}`
    return this.http.get(launchUrl);
  }

  getLaunchandLandFilter(launchParam, landParam){
    let launchLandUrl = `${this.all_url}&launch_success=${launchParam}&land_success=${landParam}`;
    return this.http.get(launchLandUrl);
  }

  getAllFilters(launchParam, landParam, yearParam ){
    let combinedUrl = `${this.all_url}&launch_success=${launchParam}&land_success=${landParam}&launch_year=${yearParam}`;
    return this.http.get(combinedUrl);
  }

}
