import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, Platform } from 'ionic-angular';
import { AddReminderPage } from '../add-reminder/add-reminder';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-reminders',
  templateUrl: 'reminders.html',
})
export class RemindersPage {
  frequency: string = "One Time";

  constructor(public alertCtrl: AlertController,public localNotifications: LocalNotifications, public navCtrl: NavController, public platform: Platform) {
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemindersPage');
  }

  addReminder() {
    console.log('time is ' + this.frequency);
    this.navCtrl.push(AddReminderPage, { type: this.frequency });
  }

  cancelAll(){
     this.localNotifications.cancelAll();
  
     let alert = this.alertCtrl.create({
         title: 'All notifications cancelled',
         buttons: ['Ok']
     });
  
     alert.present();
   }

   cancelOne(id){
    // cancel(notificationId)
     this.localNotifications.cancel(id);
  
     let alert = this.alertCtrl.create({
         title: 'Notification cancelled',
         buttons: ['Ok']
     });
  
     alert.present();
   }
  
  

}
