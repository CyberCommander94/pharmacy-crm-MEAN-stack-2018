import { Component, OnInit, Input  } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contracts-header',
  templateUrl: './contracts-header.component.html',
  styleUrls: ['./contracts-header.component.css']
})
export class ContractsHeaderComponent implements OnInit {

  @Input() title: String;

  @Input() filterStr: {};

  @Input() controls: Boolean;

  @Input() addBtn: Boolean;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
