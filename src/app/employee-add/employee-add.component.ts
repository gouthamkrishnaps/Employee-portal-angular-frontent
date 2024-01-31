import { Component } from '@angular/core';
import { employeeModel } from '../employee.model';
import { AdminapiService } from '../services/adminapi.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {

  /* to store the value and variable to stored the value from the inpu box which have the same structure or employee model */
  employee:employeeModel={}

  constructor(private api:AdminapiService , private router:Router){}

  cancelEmployee(){
    this.employee={}
  }

  addEmployee(){
    if(!this.employee.name || !this.employee.id || !this.employee.name || !this.employee.email || !this.employee.status){
      Swal.fire(
        'Oops...!',
        'Please fill the form completely',
        'info'
      )
    }
    else{
      console.log(this.employee);

      this.api.addEmployeeApi(this.employee).subscribe({
        next:(res:employeeModel)=>{
        console.log(res);
        Swal.fire(
          'Good...😍!',
          'Employee Added Successfully',
          'success'
        )
        this.employee={}
        this.router.navigateByUrl('employees')
        }
        ,
        error :(err:any)=>{
        console.log(err);
        Swal.fire(
          'Sorry...😭!',
          "Couldn't Add Employee..! please try again ",
          'error'
        )
        }
        
      })
    }
    
  }

}
