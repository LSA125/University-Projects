import { MapService } from './../map.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../report.service';
import { Router } from '@angular/router';
import { Location } from '../location';
import { Report } from '../report';
@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrl: './add-report.component.css'
})
export class AddReportComponent implements OnInit {
  addReportForm: FormGroup;
  addLocationForm:FormGroup;
  locations:Location[]=[]
  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private router: Router,
    private mapService:MapService
  ) {

    this.addReportForm = this.fb.group({
      witnessName: ['', Validators.required],
      witnessPhoneNumber: ['', [Validators.required,Validators.pattern("^[ 0-9]*$")]],
      villainName: ['', Validators.required],
      locationName: ['', Validators.required],
      pictureLink: [''],
      extraInfo: [''],
      status: 'OPEN',
      dateTime: new Date().getTime()
    });
    this.addLocationForm = this.fb.group({
      name: ['',Validators.required, [this.uniqueNameValidator.bind(this)]],
      latitude: [null,[Validators.required,Validators.pattern("^-?[0-9]+(\.[0-9]*)?$")]],
      longitude: [null,[Validators.required,Validators.pattern("^-?[0-9]+(\.[0-9]*)?$")]],
      count: [0]
    })
  }
  ngOnInit(){
    this.mapService.getLocations().subscribe((locations) => {this.locations=locations.data})
  }
  onAddClick(): void {
    if (this.addReportForm.valid) {
      const newReport:Report = this.addReportForm.value;
      this.reportService.add(newReport);
      this.mapService.incrementLocation(newReport.locationName);
      this.router.navigate(['/reports']);
    }
  }
  onSelectClick(){
    var temp:any = this.mapService.getLastClick()
    this.addLocationForm.controls['latitude'].setValue( temp.lat)
    this.addLocationForm.controls['longitude'].setValue( temp.lng)
  }
  onLocationClick():void{
    if(this.addLocationForm.valid){
      const newLocation = this.addLocationForm.value;
      this.locations.push(newLocation)
      this.mapService.add(newLocation)
      this.addLocationForm.reset()
    }
  }
  onCancelClick(): void {
    this.router.navigate(['/reports']);
  }
  uniqueNameValidator(control: AbstractControl) {
    const name = control.value;
    const isNameTaken = this.locations.some(location => location.name === name);

    return isNameTaken ? Promise.resolve({ duplicateName: true }) : Promise.resolve(null);
  }
}
