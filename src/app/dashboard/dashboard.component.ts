import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  showSidebar:boolean=true
  employeeCount:Number=0
  adminName:any=""
  adminDetials:any={}

  selected: Date | null = new Date()
  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions = {} // required
  profileImage:string ='./assets/gallery/user.png'
  EditAdminStatus:boolean=false

  constructor(private api:AdminapiService){



    this.chartOptions= {
      chart: {
          type: 'pie'
      },
      title: {
          text: 'Employee Management'
      },
      tooltip: {
          valueSuffix: '%'
      },
      subtitle: {
          text:
          'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
      },
      plotOptions: {
          series: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: [{
                  enabled: true,
                  distance: 20
              }, {
                  enabled: true,
                  distance: -40,
                  format: '{point.percentage:.1f}%',
                  style: {
                      fontSize: '1.2em',
                      textOutline: 'none',
                      opacity: 0.7
                  },
                  filter: {
                      operator: '>',
                      property: 'percentage',
                      value: 10
                  }
              }]
          }
      },
      credits:{
        enabled:false
      },
      series: [
          {
              name: 'Project',
              colorByPoint: true,
              data: [
                  {
                      name: 'FireFox',
                      y: 55.02
                  },
                  {
                      name: 'Chrome',
                      sliced: true,
                      selected: true,
                      y: 26.71
                  },
                  {
                      name: 'Safari',
                      y: 1.09
                  },
                  {
                      name: 'Opera',
                      y: 15.5
                  },
                  {
                      name: 'Edge',
                      y: 1.68
                  }
              ]
          }
      ]
  }
  HC_exporting(Highcharts);
  }

  ngOnInit():void{
    if(localStorage.getItem("name")){
      this.adminName=localStorage.getItem("name")
      console.log(this.adminName);
      
    }
    this.totalEmployee()

    this.api.authorization().subscribe((res:any)=>{
      console.log(res);
      this.adminDetials=res
      if(res.picture){
        this.profileImage=res.picture
      }
      
    })
  }

  edit(){
    this.EditAdminStatus=true
  }
  menuBar(){
    this.showSidebar=!this.showSidebar
  }

  totalEmployee(){
    this.api.getAllEmployeeApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.employeeCount=res.length
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  getFile(event:any){
    let fileDetials = event.target.files[0]
    console.log(fileDetials);
    //create an object for filereader
    let fr = new FileReader()

    //read
    fr.readAsDataURL(fileDetials)

    //convert
    fr.onload=(event:any)=>{
      //console.log(event.target.result);
      this.profileImage = event.target.result
      this.adminDetials.picture=this.profileImage
      
    }
    
  }

  updateAdmin(){
    this.api.updateAdminApi(this.adminDetials).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire(
          'Great 👍',
          'Update Successfull !',
          'success'
        )
        localStorage.setItem('name',res.name)
        localStorage.setItem('pswd',res.password)
        this.adminName=localStorage.getItem('name')
      },
      error:(err:any)=>{
        console.log(err);
        Swal.fire(
          'Sorry 😕',
          "Couldn't Update detials",
          'error'
        )
        
      }
    })
  }

  reset(){
    this.api.authorization().subscribe((res:any)=>{
      console.log(res);
      this.adminDetials=res
      if(res.picture){
        this.profileImage=res.picture
      }
      this.EditAdminStatus=false
    })
  }
}
