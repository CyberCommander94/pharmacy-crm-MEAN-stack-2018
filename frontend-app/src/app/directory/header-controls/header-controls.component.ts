import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/user';

@Component({
  selector: 'app-header-controls',
  templateUrl: './header-controls.component.html',
  styleUrls: ['./header-controls.component.css']
})
export class HeaderControlsComponent implements OnInit {

  private currUser: User;

  @Input() filterStr: {};

  constructor(private router: Router) { }

  goAddItem(){
    this.router.navigate(['directory/addItem']);
  }
    
  ngOnInit() {
    this.currUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
