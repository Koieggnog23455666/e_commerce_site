import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
 
})
export class LoginComponent {
  member:any={
    userName:'',
    password:''
  }
  login=new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })
  isSignupOpen: boolean = false;
  toggleSignup() {
    this.isSignupOpen = !this.isSignupOpen;
  }
  constructor(private router:Router){}
  onLogin(){
    this.router.navigateByUrl('/products')
    // if(this.member.userName=="admin" && this.member.password=="123456"){
    // }
    // else{
    //   alert("Wrong Crenditial");
    // }
  }
}
