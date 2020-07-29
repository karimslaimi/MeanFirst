import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';
import {TaskModel} from './Models/Task.Model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private service:WebRequestService) { }


  // tslint:disable-next-line:typedef ban-types
  createList(title: String){
    return this.service.post("lists",{title});

  }
  getList(){
    return this.service.get("lists");
  }
  getTasks(listid:String){
    return this.service.get(`lists/${listid}/tasks`)
  }

  createTask(title: String,listid:String){
    return this.service.post(`lists/${listid}/tasks`,{title});

  }

  completed(task:TaskModel){
    return this.service.patch(`lists/${task._listId}/tasks/${task._id}`,{completed:!task.completed})
  }

}
