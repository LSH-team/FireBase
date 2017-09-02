import { Component, OnInit } from '@angular/core';
import {AuthService} from "../share/security/auth.service";
import {AuthInfo} from "../share/security/auth-info";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  authInfo: AuthInfo;
  constructor (private authService: AuthService) { }

  ngOnInit () {
    this.authService.authInfo$
      .subscribe(
        authInfo => this.authInfo = authInfo
      );
  }

  logout () {
    this.authService.logout();
  }

}
