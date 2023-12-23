import { Location } from './location';
import { Observable,of } from 'rxjs';
import { Injectable} from '@angular/core';
import { markerClass } from './marker-class';
import * as L from 'leaflet';
//icon stuffs
import {icon,Marker} from 'leaflet'
import { HttpClient } from '@angular/common/http';
const iconRetinaUrl = 'assets/marker-icon-2x.png'
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  iconSize: [25,41],
  iconAnchor: [12,41],
  popupAnchor: [1,-34],
  tooltipAnchor: [16, -28],
  shadowSize: [41,41]
});
Marker.prototype.options.icon = iconDefault;

@Injectable({
  providedIn: 'root'
})
export class MapService{
  private apiUrl = 'https://272.selfip.net/apps/v17ne2dYqf/collections/locations/documents/data';
  private map:any
  private lastClick:any = [0,0];
  private markers:markerClass[] = []
  private locations:Location[]=[]
  constructor(private http: HttpClient) {
    this.subLocation();
  }
  init(): void {
    //init map
    this.map = L.map('map').setView([49.2, -123], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);

    //init lastclick
    this.map.on('click', (e:any) =>{
      this.lastClick = e.latlng;
    })
  }
  getLocations():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}`)
  }
  add(location:Location){
    this.locations.push(location)
    let temp = {key:"data",data:this.locations}
    this.http.put<Location[]>(`${this.apiUrl}`, temp).subscribe(
      (response) => {
        console.log('PUT request successful:', response);
      },
      (error) => {
        console.error('Error in PUT request:', error);
      })
  }
  incrementLocation(locationName:string){
    for(let location of this.locations){
      if(location.name == locationName){
        if(location.count == 0){
          console.log("calling new marker")
          this.newMarker(location)
        }
        location.count++
      }
    }
    let temp = {key:"data",data:this.locations}
    this.http.put<Location[]>(`${this.apiUrl}`, temp).subscribe(
      (response) => {
        console.log('PUT request successful:', response);
      },
      (error) => {
        console.error('Error in PUT request:', error);
      })
  }
  decreaseLocation(locationName:string){
    for(let location of this.locations){
      if(location.name == locationName){
        location.count--
        if(location.count == 0){
          this.removeMarker(locationName)
        }
      }
    }
    let temp = {key:"data",data:this.locations}
    this.http.put<Location[]>(`${this.apiUrl}`, temp).subscribe(
      (response) => {
        console.log('PUT request successful:', response);
      },
      (error) => {
        console.error('Error in PUT request:', error);
      })
  }
  newMarker(location:Location){
    let temp:L.Marker = L.marker([location.latitude,location.longitude]).bindPopup("").addTo(this.map).on('click',onMClick)
    this.markers.push(new markerClass(temp,location.name))
    this.map.addLayer(temp)
    function onMClick(e:any){
      var popup = e.target.getPopup()
      var newMessage = document.createElement("p").innerHTML = "<b>" + location.name + "</b><br/>" + location.count.toString() + " cases reported."
      popup.setContent(newMessage)
    }
  }
  removeMarker(locationName:string){
    for(let marker of this.markers){
      if(marker.name == locationName){
        this.map.removeLayer(marker.marker)
      }
    }
  }
  getLastClick():any{
    return this.lastClick;
  }
  private subLocation(){
    this.http.get<any>(`${this.apiUrl}`).subscribe(data => {this.locations = data.data;     
    for(let location of this.locations){
      if(location.count > 0){
        this.newMarker(location)
      }
    }})
  }
}
