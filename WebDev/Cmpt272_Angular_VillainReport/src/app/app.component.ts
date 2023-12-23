import { Component, AfterViewInit} from '@angular/core';
import { MapService } from './map.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit{
  private map: any;
  title = 'cmpt272a4';
  constructor(public ms:MapService){}
  ngAfterViewInit(): void {
      //idk why but if i use ngAFterViewInit in MapService the program breaks
      this.ms.init();
  }
}
