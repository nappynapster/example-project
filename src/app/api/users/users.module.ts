import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersApiService } from './users.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../auth/auth.interceptor';
import { StoreModule } from '@ngrx/store';
import { USERS_FEATURE_KEY, usersReducer } from './store/users.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(USERS_FEATURE_KEY, usersReducer)
  ],
  providers: [
    UsersApiService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,
    },
  ],
})
export class UsersApiModule {
}
