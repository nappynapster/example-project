import { Component } from '@angular/core';
import { UsersApiService } from './api/users/users.service';
import { usersActions } from './api/users/store/users.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'crew-connect';

  opened = false;

  toggleSideNav() {
    this.opened = !this.opened;
  }

  constructor(private usersApiService: UsersApiService,
              private store: Store) {

    this.usersApiService.all().subscribe((users) => {
      this.store.dispatch(usersActions.init({ users: users }));
    });
  }
}
