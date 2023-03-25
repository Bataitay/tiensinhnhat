import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  constructor(private http: HttpClient) { }
  sendMail(data: any) {
    const response = new Promise(resolve => {
      this.http.post(environment.urlBackend + `send-mail-when-order`, data).subscribe((res: any) => {
        resolve(res)
        console.log();

        if (res.success == true) {
          Swal.fire({
            title: 'Chúc mừng bạn đã đặt hàng thành công.',
            width: 600,
            timer: 2000,
            icon: 'success',
            padding: '3em',
            color: '#716add',
            background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
            backdrop: `
                rgba(0,0,123,0.4)
                url("https://sweetalert2.github.io/images/nyan-cat.gif")
                left top
                no-repeat
              `
          });
          window.location.reload();

        }
      }, err => {
        let error = err.error.message;
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra!',
          text: error.name || error.phone || error.address,
        })
      });
    });
    return response;
  }
}
