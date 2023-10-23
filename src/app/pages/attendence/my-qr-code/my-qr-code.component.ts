import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { QRCodeService } from 'src/app/services/qrcode.service';
import { Config } from 'src/app/utility/config';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
@Component({
  selector: 'app-my-qr-code',
  templateUrl: './my-qr-code.component.html',
  styleUrls: ['./my-qr-code.component.scss']
})
export class MyQrCodeComponent implements OnInit {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = "qrtdata"
  qrtdata: any;
  countdown: number = 10;
  constructor(private qrtapi: QRCodeService, private config: Config) {
    // value = this.qrtdata;
  }
  ngOnInit() {
    this.GetQRCOde();
    setInterval(() => {
      this.GetQRCOde();
    }, 10000); // 10000 milliseconds = 10 seconds
    // this.startCountdown();
  }
  // async startCountdown() {
  //   for (let i = this.countdown; i > 0; i--) {
  //     this.countdown = i;
  //     await this.delay(1000);
  //   }
  //   // this.GetQRCOde();
  //    this.startCountdown();
  // }
  GetQRCOde() {
    // this.config.startLoader();
    this.qrtapi.getQRCode().subscribe(
      (res) => {
        console.log("qrt", res);
        this.qrtdata = res.result.qrCodeValue
        // this.config.stopLoader();
      },
      (error) => {
        console.error("Error fetching QR code:", error);
        this.config.stopLoader();
      }
    );
  }
  // delay(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
}