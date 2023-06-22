import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { UsersApiService } from '../api/users/users.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {

  public user$ = this.usersApiService.me$();

  constructor(public authService: AuthService,
              public authGuard: AuthGuard,
              public http: HttpClient,
              public usersApiService: UsersApiService) {
  }

}
