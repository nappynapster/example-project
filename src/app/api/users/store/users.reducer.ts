import { usersActions } from './users.action';
import { createReducer, on } from '@ngrx/store';
import { UsersState } from './users.models';

export const USERS_FEATURE_KEY = 'users';

export const initialUserState: UsersState = {
  users: [],
};

export const usersReducer = createReducer(
  initialUserState,
  on(usersActions.init, (state, users) => ({ users: users.users })),
  on(usersActions.add, (state, user) => ({ users: [...state.users, user.user] })),
);
