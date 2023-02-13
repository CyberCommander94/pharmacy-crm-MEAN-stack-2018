import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-directory-header',
  templateUrl: './directory-header.component.html',
  styleUrls: ['./directory-header.component.css']
})
export class DirectoryHeaderComponent implements OnInit {
  
  @Input() title: string;
  @Input() controls: boolean;
  @Input() filterStr: {};

  constructor(private router: Router) {}

  goAddItem(){
    this.router.navigate(['directory/addItem']);
  }

  ngOnInit() {
  }

}
