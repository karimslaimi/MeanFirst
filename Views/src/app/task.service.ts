import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';
import {TaskModel} from './Models/Task.Model';
import {ListModel} from './Models/List.Model';

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

  delete(listid:string){
    return this.service.delete(`lists/${listid}`);
  }

  updateList(List:ListModel){
    return this.service.patch(`lists/${List._id}`,{title:List.title})
  }

  deleteTask(taskid:string ,list_id:string){
    return this.service.delete(`lists/${list_id}/tasks/${taskid}`);
  }

  updatetask(title,selectedtask,selectedList){
    return this.service.patch(`lists/${selectedList}/tasks/${selectedtask}`,{title:title})

}

}
