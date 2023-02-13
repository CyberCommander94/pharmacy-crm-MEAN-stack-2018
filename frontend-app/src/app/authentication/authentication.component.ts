import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../servises/authentication/authentication.service"
import { HttpActionsService } from "../servises/http-actions/http-actions.service"
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers: [AuthenticationService,
              HttpActionsService
  ]
})
export class AuthenticationComponent implements OnInit {

  private returnUrl: string;
  loading = false;
  private loginData = new LoginData();

  constructor(private httpActionsService: HttpActionsService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authenticationService.logout();
 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.loginData).subscribe(data => {
      this.router.navigate([this.returnUrl]);
    });
  }

  goRegister(){
    this.router.navigate(['register']);
  }

}

class LoginData{
  login: String;
  password: String;
}
