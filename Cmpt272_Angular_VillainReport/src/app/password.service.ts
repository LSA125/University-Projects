import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private isDialogOpen:boolean = false;
  isOpen():boolean{
    return this.isDialogOpen
  }
  setDialogueStatus(inp:boolean){
    this.isDialogOpen = inp;
  }
}
