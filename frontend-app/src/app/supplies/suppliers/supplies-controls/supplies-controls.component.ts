import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-supplies-controls',
  templateUrl: './supplies-controls.component.html',
  styleUrls: ['./supplies-controls.component.css']
})
export class SuppliesControlsComponent implements OnInit {
  
  @Input() addBtn: Boolean;
  
  @Input() filterStr: {};

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goAddItem(){
    this.router.navigate(['suppliers/addSupplier']);
  }
}
