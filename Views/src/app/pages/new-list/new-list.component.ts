import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../task.service';
import {Router} from '@angular/router';
import {TaskModel} from '../../Models/Task.Model';
import {ListModel} from '../../Models/List.Model';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskservice:TaskService,private route:Router) { }

  ngOnInit(): void {
  }

  createnewList(title:String){
    this.taskservice.createList(title).subscribe((response:ListModel)=>{

      //return to /list/id
     this.route.navigate(["/lists",response._id]);
    });

  }

}
