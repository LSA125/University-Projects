import { Observable,Subject,of } from 'rxjs';
import { Report } from './report';
import { Injectable } from '@angular/core';
import { Location } from './location';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class ReportService {
  apiUrl:string="{insert api url}"
  private _reports:Report[]=[];


  //from: https://stackoverflow.com/questions/56814989/angular-subscribe-not-detecting-changes-therefore-my-view-not-getting-updated
  private reportsSource = new Subject<any>();
  reportsObservable=this.reportsSource.asObservable();
  get reports()
  {
    return this._reports
  }
  set reports(value:Report[])
  {
    this._reports=value;
    this.reportsSource.next(value)
  }

  constructor(private http:HttpClient){
    //grab the data from the server:
    //this is the only time a get is used for reports
    this.http.get<any>(`${this.apiUrl}`).subscribe(data => {this.reports = data.data;})
  }
  add(report:Report){
    //add report
    this.reports.push(report)
    //update server
    let temp = {key:"data",data:this.reports}
    this.http.put<Report[]>(`${this.apiUrl}`, temp).subscribe(
      (response) => {
        console.log('PUT request successful:', response);
      },
      (error) => {
        console.error('Error in PUT request:', error);
      })
  }
  delete(report:Report){
    //remove report
    this.reports = this.reports.filter((p) => p != report)

    //update server
    const temp = {key:"data",data:this.reports}
    this.http.put<Report[]>(`${this.apiUrl}`, temp).subscribe(
      (response) => {
        console.log('PUT request successful:', response);
      },
      (error) => {
        console.error('Error in PUT request:', error);
      })
    return this.reports
  }
  toggleStatus(report:Report,newStatus:'OPEN' | 'RESOLVED'){
    //find where the report is and set the status
    let i = this.reports.indexOf(report);
    this.reports[i].status = newStatus;
    let temp = {key:"data",data:this.reports}
    //put and debug
    this.http.put<Report[]>(`${this.apiUrl}`, temp).subscribe(
      (response) => {
        console.log('PUT request successful:', response);
      },
      (error) => {
        console.error('Error in PUT request:', error);
      })
  }
  strCompare(a:string,b:string){
    if ( a.toLowerCase() < b.toLowerCase()){
      return -1;
    }
    if ( a.toLowerCase() > b.toLowerCase()){
      return 1;
    }
    return 0;
  }
  sortLocationAsc(){this.reports.sort((a:Report,b:Report)=>{return this.strCompare(a.locationName,b.locationName)})}
  sortLocationDesc(){this.reports.sort((a:Report,b:Report)=>{return this.strCompare(b.locationName,a.locationName)})}
  sortNameAsc(){this.reports.sort((a:Report,b:Report)=>{return this.strCompare(a.villainName,b.villainName)})}
  sortNameDesc(){this.reports.sort((a:Report,b:Report)=>{return this.strCompare(b.villainName,a.villainName)})}
  sortTimeAsc(){this.reports.sort((a:Report,b:Report)=>{return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()})}
  sortTimeDesc(){this.reports.sort((a:Report,b:Report)=>{return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()})}
  sortStatusAsc(){this.reports.sort((a:Report,b:Report)=>{return this.strCompare(a.status,b.status)})}
  sortStatusDesc(){this.reports.sort((a:Report,b:Report)=>{return this.strCompare(b.status,a.status)})}
}
