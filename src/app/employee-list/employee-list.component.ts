import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import { employeeModel } from '../employee.model';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
/* Oninit is an interface to implement ngOnint function */

  allEmployee :employeeModel[]=[]

  searchkey:string = ""

  //for pagination
  p: number = 1;
  

  constructor(private api:AdminapiService){}

  /* lifecycle hook - call just after the component is created and construtor is called */
  ngOnInit(): void {
      this.allEmployeeDetials()
  }
  allEmployeeDetials(){
    this.api.getAllEmployeeApi().subscribe({
      next:(res:any)=>{

        this.allEmployee = res
        console.log(this.allEmployee);
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  removeEmployee(id:any){
    this.api.deleteEmployeeApi(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.allEmployeeDetials()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  sortid(){
    this.allEmployee.sort((a:any,b:any)=>a.id-b.id)
  }

  sortName(){
    this.allEmployee.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  }

  generetePdf(){
    /* create an object for jspdf */
    const pdf = new jsPDF()

    let head = [['Id','Employee name','Email','Status']]

    let body :any =[]

    this.allEmployee.forEach((item:any)=>{
      body.push([item.id , item.name , item.email ,item.status])
    })

    //font size
    pdf.setFontSize(16)
    //title (y marign and x margin)
    pdf.text('Employee Detials',10,10)
    //table
    autoTable(pdf,{head,body})
    //to open in new tab
    pdf.output('dataurlnewwindow')

    //save and download
    pdf.save('employee.pdf')
  }

}
