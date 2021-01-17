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

  //to get the filtered list based on successful launch
  getLaunchFilter(param){
    let launchUrl = `${this.all_url}&launch_success=${param}`
    return this.http.get(launchUrl);
  }

  //to get the filtered list based on successful launch and successful land
  getLaunchandLandFilter(launchParam, landParam){
    let launchLandUrl = `${this.all_url}&launch_success=${launchParam}&land_success=${landParam}`;
    return this.http.get(launchLandUrl);
  }

  //to get the filtered list based on successful launch, successful land and year
  getAllFilters(launchParam, landParam, yearParam ){
    let combinedUrl = `${this.all_url}&launch_success=${launchParam}&land_success=${landParam}&launch_year=${yearParam}`;
    return this.http.get(combinedUrl);
  }

}
