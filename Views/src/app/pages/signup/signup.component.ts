import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private service:AuthService,private router:Router) { }

  ngOnInit(): void {
  }



  OnSignUpButton(email:string,password:string){
    console.log("onlogin button")
    this.service.signup(email,password).subscribe( (res:HttpResponse<any>)=>{
      console.log(res);
      this.router.navigateByUrl("/lists")
    });

  }


}
