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
  public newFilterData;
  public isLandedSelected = null;
  public isLaunchedSelected = null;
  public isYearSelected = null;
  public uniqueYears = [];
  private filteredObj = {
    date: "",
    isLanded: null,
    isLaunch: null
  };

  constructor(private preview: PreviewService) {
    this.renderList();
  }

  renderList(){
    this.loading = true;
    this.preview.getPrograms().subscribe((data: any) => {
      //destructuring required data from the array
      this.loading = false;
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

  removeDuplicateYear(array) {
    array.map((year) => {
      if(!this.uniqueYears.includes(year.launch_year)) {
        this.uniqueYears.push(year.launch_year)
      }
      })
    return this.uniqueYears;
  };

  isLaunched(isLaunced){
    this.loading = true;
    this.filteredObj.isLaunch = isLaunced;
    this.isLaunchedSelected = isLaunced;
    if(this.isYearSelected != null && this.isLandedSelected != null){
    this.preview.getLaunchFilter(isLaunced).subscribe((data: any) => {
      this.loading = false;
      this.findFilter(data);
      this.newFilterData = this.previewData;
    })
  }else{
    this.loading = false;
    this.filteredList();
  }
  }

  isLanded(isLanded){
    this.loading = true;
    this.filteredObj.isLanded = isLanded;
    this.isLandedSelected = isLanded;
    if( this.isLaunchedSelected != null){
    this.preview.getLaunchandLandFilter(this.isLaunchedSelected, this.isLandedSelected).subscribe((data: any) => {
      this.loading = false;
      this.findFilter(data);
      this.newFilterData = this.previewData;
    })
  }else{
    this.loading = false;
    this.filteredList();
  }
  }

  isYear(event){
    this.loading = true;
    this.filteredObj.date = event;
    this.isYearSelected = event;
    if(this.isLaunchedSelected != null){
      this.preview.getAllFilters(this.isLaunchedSelected, this.isLandedSelected, this.isYearSelected).subscribe((data: any) => {
        this.loading = false;
        this.findFilter(data);
        this.newFilterData = this.previewData;
      })
    }else{
      this.loading = false;
      this.filteredList();
    }
  }

  findFilter(filterData){
    this.previewData = filterData.map((newData) => {
      return{
        launch_year: newData.launch_year,
            mission_name : newData.mission_name,
            flight_number: newData.flight_number,
            mission_id: newData.mission_id,
            land_success : newData.rocket.first_stage.cores[0].land_success,
            launch_success: newData.launch_success,
            mission_patch: newData.links.mission_patch_small
      }
    })
  };

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
