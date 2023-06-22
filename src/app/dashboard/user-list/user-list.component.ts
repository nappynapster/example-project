import { Component } from '@angular/core';
import { combineLatest, map, startWith } from 'rxjs';
import { RoleEnum, UserInterface } from '../../api/users/interfaces/user.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { selectUsers } from '../../api/users/store/users.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {

  public allUsers$ = this.store.select(selectUsers);

  public roleType = RoleEnum;
  public form = new FormGroup({
    search: new FormControl({ value: '', disabled: false }, { nonNullable: true }),
  });

  public formInput$ = this.form.valueChanges.pipe(
    map((search) => search.search),
    startWith(''),
  );

  public userResult$ = combineLatest({
    users: this.allUsers$,
    search: this.formInput$,
  }).pipe(
    map(streams => streams.users.filter((user) => this.filterNamesFn(user, streams.search || ''))),
  );

  constructor(private store: Store) {
  }

  filterNamesFn = (user: UserInterface, searchTerm: string) => {
    return user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
  };
}
