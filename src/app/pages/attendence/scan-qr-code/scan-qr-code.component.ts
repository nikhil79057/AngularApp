import { Component, OnInit } from '@angular/core';
// import { ZXingScannerComponent } from '@zxing/ngx-scanner';
// import { CheckinCheckoutService } from 'src/app/services/checkin-checkout.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { Router } from '@angular/router';
@Component({
  selector: 'app-scan-qr-code',
  templateUrl: './scan-qr-code.component.html',
  styleUrls: ['./scan-qr-code.component.scss']
})
export class ScanQrCodeComponent implements AfterViewInit {
  // isLoading: boolean = false; // Initialize the loader state
  // @ViewChild('action') scanner: NgxScannerQrcodeComponent;
  isLoading: boolean = false; // Initialize the loader state
  @ViewChild('action', { static: false }) scanner: NgxScannerQrcodeComponent;
  constructor(private router: Router) { }
  ngAfterViewInit() {
    this.scanner.start();
  }
  handleScanResult(scannedData: string) {
    // Assuming you have a function to validate the scanned data
    if (this.isValidScannedData(scannedData)) {
        // Show the loader
        this.isLoading = true;

        // Simulate a delay (e.g., 2 seconds) before navigating to the new URL
        setTimeout(() => {
          this.router.navigate(['/scanner']); // Replace 'new-url' with your desired URL
        }, 2000);
      }
  }

  isValidScannedData(scannedData: string): boolean {
    // Implement your data validation logic here
    // Return true if the data is valid, or false if it's not
    return true;
  }

 
}
