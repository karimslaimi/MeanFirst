import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskService} from '../../task.service';
import {ListModel} from '../../Models/List.Model';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  constructor(private router:Router,private taskservice:TaskService,private route:ActivatedRoute) { }
  selectedList:string;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {

      this.selectedList = params.id;


    });
  }


  UpdateList(title:string){
    let List=new ListModel();

    List.title=title;
    List._id=this.selectedList;
    this.taskservice.updateList(List).subscribe((response:any)=>{
      console.log("updated list successfully");
      console.log(response);
    });
    this.router.navigateByUrl(`lists/${this.selectedList}`);

  }

}
