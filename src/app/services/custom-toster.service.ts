import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CustomTosterService {
  constructor(public toastController: ToastController) {}
  async presentToast(tType:any,tMessage:any) {
    const toast = await this.toastController.create({
      message: tMessage ? tMessage: "Something went wrong, Please try again later.",
      duration: 2000,
      position:"bottom",
      color:tType? tType: "danger"
    });
    toast.present();
  }
}
