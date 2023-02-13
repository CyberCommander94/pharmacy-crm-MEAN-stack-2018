import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-supplies-header',
  templateUrl: './supplies-header.component.html',
  styleUrls: ['./supplies-header.component.css']
})
export class SuppliesHeaderComponent implements OnInit {

  @Input() title: String;

  @Input() filterStr: {};

  @Input() controls: Boolean;

  @Input() addBtn: Boolean;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
