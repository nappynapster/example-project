import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_HOST } from '../../config/constants';
import { TemplateBlockInterface } from './interfaces/template-block.interface';

@Injectable({
  providedIn: 'root',
})
export class TemplateBlockApiService {

  constructor(private http: HttpClient) {
  }

  public all(){
    return this.http.get<Array<TemplateBlockInterface>>(API_HOST + '/template-store/all');
  }

  public update(template: TemplateBlockInterface){
    return this.http.post(API_HOST + '/template-store/update', template);
  }
}
