import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contracts-controls',
  templateUrl: './contracts-controls.component.html',
  styleUrls: ['./contracts-controls.component.css']
})
export class ContractsControlsComponent implements OnInit {

  @Input() addBtn: Boolean;
  
  @Input() filterStr: {};

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goAddContract(){
    this.router.navigate(['contracts/addContract']);
  }

}
