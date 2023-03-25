import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalServiceService } from './modal-service.service';
import { compileNgModule } from '@angular/compiler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges  {
  @Input() getOrder: any = [];
  @Input() totalOrder: any = 0;
  @Output() quantity = new EventEmitter<number>();

  method = 1;
  number_account: string = '0000000000074';
  message: string = '';
  inforForm !: FormGroup;
  price1k: number = 100000;
  price2k: number = 120000;
  price5k: number = 160000;
  price10k: number = 200000;
  price20k: number = 220000;
  price50k: number = 250000;
  price100k: number = 300000;
  price200k: number = 400000;
  ship: number = 30000;
  totalAndShip: number = 0;
  allPrice:any = [];
  constructor(private fb: FormBuilder,
    private modalService: ModalServiceService) { }

    ngOnChanges(changes: SimpleChanges) {
      this.totalOrder = localStorage['total'];
      this.totalAndShip = Number(this.totalOrder) + this.ship;
    }
  ngOnInit(): void {
    this.inforForm = this.fb.group({
      name: [''],
      phone: [''],
      address: [''],
      note: [''],
      pay_method: [''],
    });
  }
  code() {
    this.method = 1;
  }
  tranfer() {
    this.method = 2;
  }
  toOrder() {
    let ifOrder = JSON.parse(localStorage['data_order']);
    if (ifOrder == '') {
      Swal.fire({
        icon: 'error',
        title: 'Có lỗi xảy ra!',
        text: 'Vui lòng chọn đơn hàng trước khi thanh toán',
      })
    }
    let data = {
      name: this.inforForm.value.name,
      phone: this.inforForm.value.phone,
      address: this.inforForm.value.address,
      note: this.inforForm?.value.note,
      pay_method: this.method,
      ifOrder: ifOrder,
    }
    console.log(data);


    this.modalService.sendMail(data).then((res: any) => {

    })
  }
  delete(id: any) {
    let newObj = JSON.parse(localStorage['data_order']);
    newObj.forEach((element: any, index: any) => {
      if (index == id) {
        newObj.splice(index, 1);
        localStorage.removeItem('data_order');
        localStorage.setItem('data_order', JSON.stringify(newObj));
        this.getOrder = JSON.parse(localStorage['data_order']);
        this.quantity.emit(this.getOrder.length);
      }
    });

    let totalMoney = 0;
      const total = this.getOrder.map((val: any) => {
        totalMoney += Number(val.price)
      });
      localStorage.setItem('total', JSON.stringify(totalMoney));
      this.totalOrder = Number(localStorage.getItem('total'));
      this.totalAndShip = Number(this.totalOrder) + this.ship;
  }
  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
