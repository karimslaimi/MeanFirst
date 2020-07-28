import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private service:WebRequestService) { }


  // tslint:disable-next-line:typedef ban-types
  createList(title: String){
    return this.service.post("lists",{title});

  }
}
