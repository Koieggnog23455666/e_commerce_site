import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  member:any={
    userName:'',
    password:''
  }
  constructor(private router:Router){}
  onLogin(){
    if(this.member.userName=="admin" && this.member.password=="123456"){
this.router.navigateByUrl('/products')
    }
    else{
      alert("Wrong Crenditial");
    }
  }
}
