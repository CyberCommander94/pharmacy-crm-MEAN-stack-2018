import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-store-header',
  templateUrl: './store-header.component.html',
  styleUrls: ['./store-header.component.css']
})
export class StoreHeaderComponent implements OnInit {
  
  @Input() title: String;

  @Input() addBtn: Boolean;

  @Input() filterStr: {};

  @Input() controls: Boolean;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
