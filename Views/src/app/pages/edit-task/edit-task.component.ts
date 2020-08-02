import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskService} from '../../task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private router:Router,private taskservice:TaskService,private route:ActivatedRoute) { }

  selectedList:string;
  selectedtask:string;


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {

      this.selectedList = params.listId;
        this.selectedtask=params.taskId;

    });
  }




  UpdateTask(title:string){
    this.taskservice.updatetask(title,this.selectedtask,this.selectedList).subscribe((res:any)=>{
      console.log(res);
    })

    this.router.navigateByUrl(`lists/${this.selectedList}`);
  }




}
