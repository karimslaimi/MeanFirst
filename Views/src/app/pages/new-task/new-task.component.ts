import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../task.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskModel} from '../../Models/Task.Model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskservice:TaskService,private route:ActivatedRoute,private router:Router) { }
listId:any;
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{

      this.listId=params["id"];
      console.log(this.listId);
    });

  }

  createnewtask(title:String){

    return this.taskservice.createTask(title,this.listId).subscribe((task:TaskModel)=>{
      this.router.navigate(["/lists",task._listId]);
    });
  }

}
