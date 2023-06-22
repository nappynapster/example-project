import { Component } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { UserInterface } from '../api/users/interfaces/user.interface';
import { AddUserComponent } from './user-list/add-user/add-user.component';
import { usersActions } from '../api/users/store/users.action';
import { AuthGuard } from '../auth/auth.guard';
import { UsersApiService } from '../api/users/users.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  constructor(public authGuard: AuthGuard,
              private usersApiService: UsersApiService,
              private store: Store,
              public dialog: Dialog) {
  }

  openAddUserDialog(): void {
    const dialogRef: DialogRef<UserInterface, AddUserComponent> = this.dialog.open(AddUserComponent, {
      width: '600px',
    });

    dialogRef.closed.subscribe((user: UserInterface | undefined) => {
      if (user) {
        this.usersApiService.create(user).subscribe((res) => {
          this.store.dispatch(usersActions.add({user: res}));
        });
      }
    });
  }
}
