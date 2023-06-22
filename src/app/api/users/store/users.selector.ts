import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.models';
import { USERS_FEATURE_KEY } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsers = createSelector(selectUsersState, (state: UsersState) => state.users);
