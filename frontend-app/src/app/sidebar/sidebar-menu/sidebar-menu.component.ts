import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  private currUser: User;
  private salesVisible: Boolean;
  private storeVisible: Boolean;
  private supplyVisible: Boolean;
  private statVisible: Boolean;

  constructor() { }

  
  ngOnInit() {
    setInterval(() => {
      this.currUser = JSON.parse(localStorage.getItem('currentUser'));
    });
  }

  changeVisibility(itemNumber){
    switch(itemNumber){
      case 1:
        if(this.salesVisible){
          this.salesVisible = false;
        } else {
          this.salesVisible = true;
          this.storeVisible = false;
          this.supplyVisible = false;
          this.statVisible = false;
        }
        break;
      case 2:
        if(this.storeVisible){
          this.storeVisible = false;
        } else {
          this.salesVisible = false;
          this.storeVisible = true;
          this.supplyVisible = false;
          this.statVisible = false;
        }
        break;
      case 3:
        if(this.supplyVisible){
          this.supplyVisible = false;
        } else {
          this.salesVisible = false;
          this.storeVisible = false;
          this.supplyVisible = true;
          this.statVisible = false;
        }
        break;
      case 4:
        if(this.statVisible){
          this.statVisible = false;
        } else {
          this.salesVisible = false;
          this.storeVisible = false;
          this.supplyVisible = false;
          this.statVisible = true;
        }
        break;
    }
  }
}
