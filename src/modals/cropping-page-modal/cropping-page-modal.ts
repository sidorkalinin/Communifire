import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import Cropper from 'cropperjs';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'cropping-page-modal',
  templateUrl: 'cropping-page-modal.html',
})
export class CroppingPageModal implements OnInit {
  
  @ViewChild('imageSrc') imageElement: ElementRef;
  cropperInstance: any;
  imageData: any;
  isIphoneX:boolean = false;

  constructor(
    public navParams: NavParams,
    private viewCtrl:ViewController,
    public device: Device,
  ) {
    this.imageData = this.navParams.get('imageuri');
    console.log(this.imageData);
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
  }
  
  ngOnInit(): void {
  }

  ionViewDidLoad() {
    this.imageElement.nativeElement.src = this.imageData;
  }

  cropImage() {
    this.cropperInstance = new Cropper(this.imageElement.nativeElement, {
      aspectRatio: 4 / 3, // square
      modal: true,
      guides: true,
      highlight: false,
      background: false,
      autoCrop: true,
      autoCropArea: 0.9,
      responsive: true,
      zoomable: true,
      movable: false
    });
  }

  cropDone() {
    let croppedImg = this.cropperInstance.getCroppedCanvas({ width: 500, height: 500}).toDataURL('image/jpeg');
    // do whatever you want with base64 variable croppedImg
    this.viewCtrl.dismiss({url: croppedImg});
  }
  back(){
    this.viewCtrl.dismiss();
  }
}