import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-add-reminder',
  templateUrl: 'add-reminder.html',
})
export class AddReminderPage {
  typeReminder: string;
  typeDaily: boolean = false;
  typeCustom: boolean = false;
  notifyTime: any;
  notifications: any[] = [];
  days: any[];
  chosenHours: number;
  chosenMinutes: number;

  
  constructor(public alertCtrl: AlertController, public localNotifications: LocalNotifications, public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
    this.typeReminder = navParams.get('type');

    this.notifyTime = moment(new Date()).format();
 
    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes();

    this.days = [
        {title: 'Monday', dayCode: 1, checked: false},
        {title: 'Tuesday', dayCode: 2, checked: false},
        {title: 'Wednesday', dayCode: 3, checked: false},
        {title: 'Thursday', dayCode: 4, checked: false},
        {title: 'Friday', dayCode: 5, checked: false},
        {title: 'Saturday', dayCode: 6, checked: false},
        {title: 'Sunday', dayCode: 0, checked: false}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddReminderPage');
    if (this.typeReminder == "Daily") {
      this.typeDaily = true;
    }
    else if (this.typeReminder == "Custom") {
      this.typeCustom = true;
    }
  }

  timeChange(time) {
    this.chosenHours = time.hour.value;
    this.chosenMinutes = time.minute.value;
  }

  addDailyNotification() {
    let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.

    //this.localNotifications.cancelAll();
      console.log('cancelled');
    
    //return false;

    this.localNotifications.schedule({
      id: 1,
      title: "Boat Boss",
      text: "Delayed Notification",
      at: new Date(new Date().getTime() + 5 * 1000),
      sound: null,
      icon: 'res://icon.png',
    });
    // icon needs to be transparent

    // console.log('should have been done');
 
    // for(let day of this.days){
 
    //     if(day.checked){
 
    //         let firstNotificationTime = new Date();
    //         let dayDifference = day.dayCode - currentDay;
 
    //         if(dayDifference < 0){
    //             dayDifference = dayDifference + 7; // for cases where the day is in the following week
    //         }
 
    //         firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
    //         firstNotificationTime.setHours(this.chosenHours);
    //         firstNotificationTime.setMinutes(this.chosenMinutes);
 
    //         let notification = {
    //             id: day.dayCode,
    //             title: 'Hey!',
    //             text: 'You just got notified :)',
    //             at: firstNotificationTime,
    //             every: 'week'
    //         };

    //         this.localNotifications.schedule({
    //           id: 1,
    //           title: "Test Title",
    //           text: "Delayed Notification",
    //           at: new Date(new Date().getTime() + 5 * 1000),
    //           sound: null
    //         });
 
    //         this.notifications.push(notification);
 
    //     }
 
    // }
 
    // console.log("Notifications to be scheduled: ", this.notifications);
 
    // if(this.platform.is('cordova')){
 
        // Cancel any existing notifications
       // this.localNotifications.cancelAll().then(() => {
 
            // Schedule the new notifications
            // this.localNotifications.schedule(this.notifications);
 
            // this.notifications = [];
 
            // let alert = this.alertCtrl.create({
            //     title: 'Notifications set',
            //     buttons: ['Ok']
            // });
 
            // alert.present();
 
       // });
 
    //}
 
  }

  addWeeklyNotification() {

  }

  addMonthlyNotification() {

  }

  addYearlyNotification() {

  }

  addCustomNotification() {
    let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.

    this.localNotifications.schedule({
      id: 1,
      title: "Test Title",
      text: "Delayed Notification",
      at: new Date(new Date().getTime() + 5 * 1000),
      sound: null
    });
    console.log('should have been done');
 
    for(let day of this.days){
 
        if(day.checked){
 
            let firstNotificationTime = new Date();
            let dayDifference = day.dayCode - currentDay;
 
            if(dayDifference < 0){
                dayDifference = dayDifference + 7; // for cases where the day is in the following week
            }
 
            firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
            firstNotificationTime.setHours(this.chosenHours);
            firstNotificationTime.setMinutes(this.chosenMinutes);
 
            let notification = {
                id: day.dayCode,
                title: 'Hey!',
                text: 'You just got notified :)',
                at: firstNotificationTime,
                every: 'week'
            };

            this.localNotifications.schedule({
              id: 1,
              title: "Test Title",
              text: "Delayed Notification",
              at: new Date(new Date().getTime() + 5 * 1000),
              sound: null
            });
 
            this.notifications.push(notification);
 
        }
 
    }
 
    console.log("Notifications to be scheduled: ", this.notifications);
 
    if(this.platform.is('cordova')){
 
        // Cancel any existing notifications
       // this.localNotifications.cancelAll().then(() => {
 
            // Schedule the new notifications
            // this.localNotifications.schedule(this.notifications);
 
            // this.notifications = [];
 
            // let alert = this.alertCtrl.create({
            //     title: 'Notifications set',
            //     buttons: ['Ok']
            // });
 
            // alert.present();
 
       // });
 
    }
 
  }


}
