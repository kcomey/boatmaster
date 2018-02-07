import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, Platform } from 'ionic-angular';
import { AddReminderPage } from '../add-reminder/add-reminder';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DataReminderProvider } from '../../providers/data-reminder/data-reminder';

@IonicPage()
@Component({
  selector: 'page-reminders',
  templateUrl: 'reminders.html',
})
export class RemindersPage {
  frequency: string = "One Time";
  reminders: any = [];
  showReminders: boolean = false;

  constructor(public dataService: DataReminderProvider, public alertCtrl: AlertController,public localNotifications: LocalNotifications, public navCtrl: NavController, public platform: Platform) {
  }
  

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.dataService.getData().then((reminders) => {
        if (reminders != null) {
          this.reminders = reminders;
          this.showReminders = true;
        }
      });
    });
  }

  addReminder() {
    console.log('time is ' + this.frequency);
    this.navCtrl.push(AddReminderPage, { type: this.frequency });
  }

  deleteAllReminders(){
     this.localNotifications.cancelAll();
  
     let alert = this.alertCtrl.create({
         title: 'All notifications cancelled',
         buttons: ['Ok']
     });
  
     alert.present();
   }

   deleteReminder(id){
    // cancel(notificationId)
     this.localNotifications.cancel(id);
  
     let alert = this.alertCtrl.create({
         title: 'Notification cancelled',
         buttons: ['Ok']
     });
  
     alert.present();
   }
  
  

}
