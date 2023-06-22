import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_HOST } from '../../config/constants';
import { UserInterface } from './interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable()
export class UsersApiService {

  constructor(private http: HttpClient) {
  }

  public all(): Observable<Array<UserInterface>> {
    return this.http.get<Array<UserInterface>>(API_HOST + '/users/all').pipe(
    );
  }

  public me$(): Observable<UserInterface> {
    return this.http.get<UserInterface>(API_HOST + '/users/me');
  }

  public create(user:UserInterface):Observable<UserInterface>{
    return this.http.post<UserInterface>(API_HOST + '/users/create', user);
  }
}
