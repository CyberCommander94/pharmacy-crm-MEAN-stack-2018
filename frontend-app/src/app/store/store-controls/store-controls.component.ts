import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-store-controls',
  templateUrl: './store-controls.component.html',
  styleUrls: ['./store-controls.component.css']
})
export class StoreControlsComponent implements OnInit {

  @Input() addBtn: Boolean;

  @Input() filterStr: {};

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  goAddItem(){
    this.router.navigate(['storeAcceptance/addItem']);
  }
}
