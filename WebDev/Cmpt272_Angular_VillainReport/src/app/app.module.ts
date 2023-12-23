import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportListComponent } from './report-list/report-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportDetailsDialogueComponent } from './report-details-dialogue/report-details-dialogue.component';
import { AddReportComponent } from './add-report/add-report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ReportListComponent,
    ReportDetailsDialogueComponent,
    AddReportComponent,
    PasswordDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
