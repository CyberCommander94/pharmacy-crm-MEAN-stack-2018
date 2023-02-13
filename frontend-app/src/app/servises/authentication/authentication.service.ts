import { Injectable } from '@angular/core';
import { HttpActionsService } from "../http-actions/http-actions.service"
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {

  constructor(private httpActionsService: HttpActionsService) { }

  login(loginData){
    return this.httpActionsService.getUserData(loginData).map(data => {
      if (data) {
        localStorage.setItem('currentUser', JSON.stringify(data));
      }
      return data;
    });
  }

  logout(){
    localStorage.removeItem('currentUser');
  }
}
