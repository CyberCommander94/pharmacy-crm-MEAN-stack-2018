import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private user;

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.user = localStorage.getItem('currentUser');
    }, 1000);
  }

}
