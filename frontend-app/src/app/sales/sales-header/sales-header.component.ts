import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sales-header',
  templateUrl: './sales-header.component.html',
  styleUrls: ['./sales-header.component.css']
})
export class SalesHeaderComponent implements OnInit {

  @Input() title: String;

  constructor() { }

  ngOnInit() {
  }

}
