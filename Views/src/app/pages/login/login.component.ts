import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private service:AuthService) { }

  ngOnInit(): void {
  }

  OnloginButton(email:string,password:string){
    console.log("onlogin button")
    this.service.login(email,password).subscribe( (res:HttpResponse<any>)=>{
      console.log(res);
    });

  }
}
