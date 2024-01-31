import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminapiService } from '../services/adminapi.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  mail:string = ""
  pswd:string=""

  constructor(private api:AdminapiService,private router:Router){}

  login(){
    if(!this.mail || !this.pswd){
      Swal.fire(
        'Oops...!',
        'Please fill the form completely',
        'info'
      )
    }
    else{

      this.api.authorization().subscribe({
        next:(res:any)=>{
          const {name , email , password} = res
          if(email === this.mail   && password === this.pswd){
            localStorage.setItem("name",name)
            localStorage.setItem("pswd",password)
            Swal.fire(
              'Welcome Admin!',
              'Login Successfull!',
              'success'
            )
            this.api.updateData({d:true})
            this.router.navigateByUrl('dashboard')
          }
          else{
            Swal.fire(
              'Oops...!',
              'Invalid Email or Password',
              'error'
            )
          }
        },
        error:(res:any)=>{
          console.log(res.message);
          
        }
      })
    }
  }



}
