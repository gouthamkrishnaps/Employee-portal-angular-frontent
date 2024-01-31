import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logged:boolean=false

  constructor(private router:Router /* ,private api.sharedData.subscribe((data:any)=>{
    this.logged = data

  }) */){}


  logout(){
    localStorage.removeItem("name")
    localStorage.removeItem("pswd")

    this.router.navigateByUrl('')
  }
}
