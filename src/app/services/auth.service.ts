import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  islogged(){
     /* !! use to get return value as boolean (true or false) */
    return !!localStorage.getItem("name")
  }
}
