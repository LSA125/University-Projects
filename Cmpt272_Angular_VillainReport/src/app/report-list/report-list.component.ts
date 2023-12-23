import { Component,OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { Report } from './../report';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { ReportDetailsDialogueComponent } from '../report-details-dialogue/report-details-dialogue.component'; // Create this component
import { MapService } from '../map.service';
import { PasswordService } from '../password.service';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.css'
})
export class ReportListComponent {
  reports:Report[]=[]
  locationAsc:boolean = false;
  nameAsc:boolean = false;
  timeAsc:boolean = false;
  statusAsc:boolean = false;
  private dialogRef: MatDialogRef<ReportDetailsDialogueComponent> | null = null;
  constructor(private rs:ReportService, 
    public dialog: MatDialog,
    private ms:MapService,
    private ps:PasswordService
    ){
      this.reports=this.rs.reports;//get reports when reinitializing this component
      this.rs.reportsObservable.subscribe(reports => {this.reports=reports;});//get reports when reports changes
    }

  sort(type:string){
    console.log("Sorting by: " + type)
    if(type==="location"){
      this.locationAsc = !this.locationAsc
      this.locationAsc ? this.rs.sortLocationAsc() : this.rs.sortLocationDesc();
    }
    if(type==="name"){
      this.nameAsc = !this.nameAsc
      this.nameAsc ? this.rs.sortNameAsc() : this.rs.sortNameDesc();
    }
    if(type==="time"){
      this.timeAsc = !this.timeAsc
      this.timeAsc ? this.rs.sortTimeAsc() : this.rs.sortTimeDesc();
    }
    if(type==="status"){
      this.statusAsc = !this.statusAsc
      this.statusAsc ? this.rs.sortStatusAsc() : this.rs.sortStatusDesc();
    }
  }
  delete(evt:any,report:Report){
    if(!this.ps.isOpen()){
      this.ps.setDialogueStatus(true);
      
      const dialogRef = this.dialog.open(PasswordDialogComponent, {
        maxWidth: '500px', // Set the max width of the dialog
        width: "auto",
        maxHeight: "60vh"
      });

      dialogRef.afterClosed().subscribe(result => {
        this.ps.setDialogueStatus(false);

        if (result) {
          this.ms.decreaseLocation(report.locationName)
          this.reports = this.rs.delete(report)
          console.log('Confirmed');
        } else {
          alert('Canceled or incorrect password');
        }
      });
    }
  }
  openReportDetails(report: Report) {
    // Close the previous dialog if it's open
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    // Open the new dialog
    this.dialogRef = this.dialog.open(ReportDetailsDialogueComponent, {
      data: { report },
      position: { top: '10px', right: '10px'},
      maxWidth: '500px', // Set the max width of the dialog
      width: "auto",
      maxHeight: "60vh"
    });
  }
}
