import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrl: './password-dialog.component.css'
})
export class PasswordDialogComponent {
  @Input() enteredPassword: string = "";
  
  constructor(
    public dialogRef: MatDialogRef<PasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    // Check if the entered password matches the hardcoded MD5 hash
    const hashedPassword = Md5.hashStr(this.enteredPassword);
    if (hashedPassword === 'fcab0453879a2b2281bc5073e3f5fe54') {
      this.dialogRef.close(true); // Password is correct
    } else {
      this.dialogRef.close(false); // Password is incorrect
    }
  }
}
