import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../task.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskModel} from '../../Models/Task.Model';
import {ListModel} from '../../Models/List.Model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(private router:Router,private taskservice:TaskService,private route:ActivatedRoute) { }

  lists:ListModel[];
  tasks:TaskModel[];
  selectedList:string;
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      if(params.id){
        this.selectedList=params.id;

      this.taskservice.getTasks(params.id).subscribe((tasks:any)=>{this.tasks=tasks});
    }else {
        this.tasks=undefined;
      }});
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

  onDeleteList(){
    this.taskservice.delete(this.selectedList).subscribe((resonse:any)=>{
      console.log("deleted")
      console.log(resonse);
      this.router.navigateByUrl("/lists");

    });


  }
  deleteTask(id:string){
    this.taskservice.deleteTask(id,this.selectedList).subscribe((response:any)=>{
      this.tasks = this.tasks.filter(val => val._id !== id);
      console.log("task deleted");


    })

  }


}
