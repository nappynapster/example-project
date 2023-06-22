import { Router } from '@angular/router';
import { JWT_TOKEN } from '../config/constants';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { RoleEnum } from '../api/users/interfaces/user.interface';

@Injectable()
export class AuthGuard {
  constructor(private router: Router) {
  }

  public isLoggedIn$ = new BehaviorSubject(false);

  public isTokenExpired(token: string): boolean {
    try {
      const payload: JwtPayloadInterface = jwt_decode(token);

      if (payload.exp && Date.now() > (payload.exp * 1000)) {
        return true;
      }

      this.isLoggedIn$.next(true);
      return false;
    } catch (err) {
      return true;
    }
  }

  public isAdminUser():boolean {
    const jwtToken = localStorage.getItem(JWT_TOKEN);

    if (jwtToken && !this.isTokenExpired(jwtToken)) {
      const payload: JwtPayloadInterface = jwt_decode(jwtToken);

      if(payload.role === RoleEnum.ADMIN)
      {
        return true;
      }
    }

    return false;
  }

  public canActivate() {
    const jwtToken = localStorage.getItem(JWT_TOKEN);

    if (jwtToken && !this.isTokenExpired(jwtToken)) {
      return true;
    }

    return this.router.createUrlTree(['/login']);
  }
}
