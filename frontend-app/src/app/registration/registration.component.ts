import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../servises/authentication/authentication.service"
import { HttpActionsService } from "../servises/http-actions/http-actions.service"
import { Router, ActivatedRoute } from '@angular/router';
import { User } from "../models/user"

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [AuthenticationService,
              HttpActionsService
  ]
})
export class RegistrationComponent implements OnInit {

  private newUser: User;

  constructor(private httpActionsService: HttpActionsService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.newUser = {} as User;
  }

  doRegistration(){
    this.httpActionsService.getUserByLogin({login: this.newUser.login}).subscribe(user => {
      if(!user){
        this.httpActionsService.addUserData(this.newUser).subscribe(usr => {
          alert("Дані користувача успішно додано");
          this.router.navigate(['login']);
        });
      } else {
        alert("Користувач з таким логіном уже є в системі. Введіть будь ласка унікальний логін");
        return;
      }
    });
  }

}
