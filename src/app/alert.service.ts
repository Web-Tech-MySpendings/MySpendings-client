import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  tinyAlert(msg: string) {
    Swal.fire(msg);
  }

  successNotification(msg: string) {
    Swal.fire('', msg, 'success');
  }

  errorNotification(msg: string) {
    Swal.fire('', msg, 'error');
  }

  alertConfirmation(txt: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: txt,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Success', '', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', '', 'error');
      }
    });
  }
}
