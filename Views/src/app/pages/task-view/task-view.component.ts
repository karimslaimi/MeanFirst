import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../task.service';
import {ActivatedRoute, Params} from '@angular/router';
import {TaskModel} from '../../Models/Task.Model';
import {ListModel} from '../../Models/List.Model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(private taskservice:TaskService,private route:ActivatedRoute) { }

  lists:ListModel[];
  tasks:TaskModel[];
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.taskservice.getTasks(params.id).subscribe((tasks:any)=>{this.tasks=tasks});
    });
    this.taskservice.getList().subscribe((lists:any)=>{

      this.lists=lists;
    })
  }
  onTaskclick(task:TaskModel){
    this.taskservice.completed(task).subscribe(()=>{
      console.log("completed successfuilly")
      task.completed=!task.completed;
    })

  }



}
