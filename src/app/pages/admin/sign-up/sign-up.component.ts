import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
member:any={
  username:'',
  email:'',
  password:''
}
signUp=new FormGroup({
  username:new FormControl('',[Validators.required]),
  email:new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
  password:new FormControl('',[Validators.required,Validators.minLength(6)]),

})
constructor(private router:Router){}
onSignUp(){
  if(this.member.username!==''|| this.member.email!=='' || this.member.password!==''){
    this.router.navigateByUrl('/products')
  }
  else{
    alert( "Please fill out all fields")
  }
}
}
