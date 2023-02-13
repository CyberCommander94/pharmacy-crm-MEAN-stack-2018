import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from "../../servises/authentication/authentication.service"
import { HttpActionsService } from "../../servises/http-actions/http-actions.service"
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-sidebar-user-info',
  templateUrl: './sidebar-user-info.component.html',
  styleUrls: ['./sidebar-user-info.component.css'],
  providers: [AuthenticationService,
              HttpActionsService
  ]
})
export class SidebarUserInfoComponent implements OnInit {

  @Input() user;

  private userInfo: User;

  constructor(private httpActionsService: HttpActionsService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userInfo = JSON.parse(this.user);
  }

  logout() {
    this.authenticationService.logout();
  }
}
