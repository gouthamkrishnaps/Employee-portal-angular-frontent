import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  //construtor is not used to inject dependcy here becoz this is not a class its a function
  const authStatus = inject(AuthService)
  const router = inject(Router)

  if(authStatus.islogged()){
    return true;
  }
  else{
    Swal.fire(
      'Oops..!',
      'Please login',
      'error'
    )
    router.navigateByUrl("")
    return false;
  }

};
