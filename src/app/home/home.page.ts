import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  imcClassification(val: number){
    if(val < 18.5){
      return "Magreza";
    }

    if(val > 18.5 && val < 24.9){
      return "Normal";
    }

    if(val > 25 && val < 29.9){
      return "Sobrepeso";
    }

    if(val > 30 && val < 39.9){
      return "Obesidade";
    }

    if(val > 40){
      return "Obesidade Grave";
    }
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    const type = this.imcClassification(imc);
    this.showMessage(`IMC = ${imc.toFixed(2)} - ${type}`);
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'light',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
