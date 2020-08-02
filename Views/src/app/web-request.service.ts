import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly root_url;

  constructor(private http: HttpClient) {
    this.root_url="http://localhost:3000";
  }

  get(url : String) {

    return this.http.get(`${this.root_url}/${url}`);
  }

  post(url : String, payload : Object){

    return this.http.post(`${this.root_url}/${url}`,payload);
  }
  patch(url : String, payload : Object){
    return this.http.patch(`${this.root_url}/${url}`,payload);
  }

  delete(url : String){
    return this.http.delete(`${this.root_url}/${url}`);
  }

  login(email:String,password:String){
    console.log("web service");
    let url="users/login";
    return this.http.post(`${this.root_url}/${url}`,{email,password},{observe:"response"});
  }
  signup(email:String,password:String){
    console.log("signup service");
    let url="users";
    return this.http.post(`${this.root_url}/${url}`,{email,password},{observe:"response"});
  }


}
