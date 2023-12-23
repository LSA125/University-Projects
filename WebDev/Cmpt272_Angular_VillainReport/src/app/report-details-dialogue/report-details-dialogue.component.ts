import { ReportService } from './../report.service';
import { Report } from './../report';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog,MatDialogRef } from '@angular/material/dialog';
import { Observable, of} from 'rxjs';
import { PasswordService } from '../password.service';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
@Component({
  selector: 'app-report-details-dialogue',
  templateUrl: './report-details-dialogue.component.html',
  styleUrl: './report-details-dialogue.component.css'
})
export class ReportDetailsDialogueComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { report: Report },
    private dialogRef: MatDialogRef<ReportDetailsDialogueComponent>,
    public dialog: MatDialog,
    private rs:ReportService,
    private ps:PasswordService
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
  toggleStatus(): Observable<'OPEN' | 'RESOLVED'> {
    //make sure there is only one password dialogue open
    if(!this.ps.isOpen()){
      this.ps.setDialogueStatus(true);
      
      const dialogRef = this.dialog.open(PasswordDialogComponent, {
        maxWidth: '500px',
        width: "auto",
        maxHeight: "60vh"
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ps.setDialogueStatus(false);

        if (result) {
          let newStatus:'OPEN' | 'RESOLVED' = this.data.report.status === 'OPEN' ? 'RESOLVED' : 'OPEN';
          this.data.report.status = newStatus;
          this.rs.toggleStatus(this.data.report, newStatus);
          console.log('Confirmed');
        } else {
          alert('Canceled or incorrect password');
        }
      });
    }

    return of(this.data.report.status);
  }
}
