import { createActionGroup, props } from '@ngrx/store';
import { UserInterface } from '../interfaces/user.interface';

export const usersActions = createActionGroup({
  source: 'Users',
  events: {
    'init': props<{ users: Array<UserInterface> }>(),
    'add': props<{ user: UserInterface }>(),
  },
});
