import { Component } from '@angular/core';
import { PreviewService } from 'src/app/preview.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent{
  public loading: boolean = false;
  private previewData;
  //rendering variable
  public newFilterData;
  public isLandedSelected = null;
  public isLaunchedSelected = null;
  public isYearSelected = null;
  public uniqueYears = [];
  //storing common data on event listeners
  private filteredObj = {
    date: "",
    isLanded: null,
    isLaunch: null
  };

  constructor(private preview: PreviewService) {
    this.renderList();
  }

  //rendering the whole list of data without any filters
  renderList(){
    this.preview.getPrograms().subscribe((data: any) => {
      //destructuring required data from the array
      this.previewData = data.map((newData) => {
        return {
          launch_year: newData.launch_year,
          mission_name : newData.mission_name,
          flight_number: newData.flight_number,
          mission_id: newData.mission_id,
          land_success : newData.rocket.first_stage.cores[0].land_success,
          launch_success: newData.launch_success,
          mission_patch: newData.links.mission_patch
        }
      })
      this.removeDuplicateYear(this.previewData);
      this.newFilterData = this.previewData;
    })
  }

  //removing duplicate years in order to show the same on year filters CTA's
  removeDuplicateYear(array) {
    array.map((year) => {
      if(!this.uniqueYears.includes(year.launch_year)) {
        this.uniqueYears.push(year.launch_year)
      }
      })
    return this.uniqueYears;
  };

  //filtering data based on launch success
  isLaunched(isLaunced){
    this.filteredObj.isLaunch = isLaunced;
    this.isLaunchedSelected = isLaunced;
    this.filteredList();
  }

  //filtering data based on land success
  isLanded(isLanded){
    this.filteredObj.isLanded = isLanded;
    this.isLandedSelected = isLanded;
    this.filteredList();
  }

  //filtering data based on launch success, land success along with the repective years
  isYear(event){
    this.filteredObj.date = event;
    this.isYearSelected = event;
    this.filteredList();
  }

  //filtering data based on one common api
  filteredList(){
    this.newFilterData = this.previewData.filter((data) => {
      let isValid = true;
      if(this.filteredObj.date){
        isValid = data.launch_year != null && data.launch_year === this.filteredObj.date;
      }
      if(this.filteredObj.isLaunch != null){
        isValid = isValid && data.launch_success === this.filteredObj.isLaunch;
      }
      if(this.filteredObj.isLanded != null){
        isValid = isValid && data.land_success === this.filteredObj.isLanded;
      }
      return isValid;
    })
  }

}
