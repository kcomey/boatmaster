import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';
import { DataReminderProvider } from '../../providers/data-reminder/data-reminder';

@IonicPage()
@Component({
  selector: 'page-add-reminder',
  templateUrl: 'add-reminder.html',
})
export class AddReminderPage {
  typeReminder: string;
  typeOnce: boolean = false;
  typeDaily: boolean = false;
  typeWeekly: boolean = false;
  typeMonthly: boolean = false;
  typeYearly: boolean = false;
  typeCustom: boolean = false;
  notifyEvent: any;
  notifyTime: any;
  notifyDate: any = new Date().toISOString().slice(0,16);
  notifications: any[] = [];
  days: any[];
  chosenHours: number;
  chosenMinutes: number;
  daySelected: any;
  isDisabled: boolean = true;
  reminders: any = [];

  constructor(public dataService: DataReminderProvider, public alertCtrl: AlertController, public localNotifications: LocalNotifications, public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
    this.typeReminder = navParams.get('type');
    if (this.typeReminder == "One Time") {
      this.typeOnce = true;
    }
    else if (this.typeReminder == "Daily") {
      this.typeDaily = true;
    }
    else if (this.typeReminder == "Weekly") {
      this.typeWeekly = true;
    }
    else if (this.typeReminder == "Monthly") {
      this.typeMonthly = true;
    }
    else if (this.typeReminder == "Yearly") {
      this.typeYearly = true;
    }
    else {
      this.typeCustom = true;
    }

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
    this.platform.ready().then(() => {
      this.dataService.getData().then((reminders) => {
        if (reminders != null) {
          this.reminders = reminders;
        }
      });

      if (this.notifyEvent != undefined) {
        this.isDisabled = false;
      }
    });
  }



  // let data = {
  //   lat: this.latitude,
  //   lng: this.longitude,
  //   image: this.image,
  //   category: 'mooring'
  // };

  // let prompt = this.modalCtrl.create(MooringDetailsPage, { data: data });
  // prompt.onDidDismiss(data => {
  //   if (data) {
  //     data.image = this.image;
  //     data.category = 'mooring';
  //     this.dataService.getLocationStopDetails().then((locations) => {
  //       if (locations != null) {
  //         locations.push(data);
  //         this.dataService.setLocationStopDetails(locations);
  //       }
  //       else {
  //         let saveData = [ data ];
  //         this.dataService.setLocationStopDetails(saveData);
  //       }
  //     });

  addOneTimeNotification() {
    let date = new Date();
    let notificationId = moment.utc(date); 
    let useId = Number(notificationId);
    //Get month, day and year
    let notifyDate = moment(this.notifyDate).toObject();
    let notifyMonth = notifyDate.months + 1;    
    //Get hour and minutes
    let notifyTime = moment(this.notifyTime).toObject();
    let newDateTime = notifyMonth +'/'+ notifyDate.date +'/'+ notifyDate.years+' '+ notifyTime.hours +':'+ notifyTime.minutes +':' + notifyTime.seconds;
    let formattedTime = new Date(new Date(newDateTime).getTime());
 
    this.localNotifications.schedule({
      id: useId,
      title: "Boat Boss Reminder!",
      text: this.notifyEvent,
      //at: newDate,
      at: formattedTime,
      sound: null,
      icon: 'res://icon.png',
    });

    let data = {
      id: useId,
      event: this.notifyEvent,
      scheduleFrequency: "One Time",
      scheduleTime: formattedTime
    };
    //Save to storage for future deletions
    this.reminders.push(data);
    this.dataService.save(this.reminders);

    this.navCtrl.pop();
  }

  addNotification(type) {
    //Will need to create local storage to keep the id's and event titles for deletion later
    //if not a one time only
    let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.

    if (type == "One Time") {
      this.addOneTimeNotification();
    }
    else if (type == "Daily") {
      this.addDailyNotification();
    }
    else {
      console.log('type is ' + type);
      console.log('event is ' + this.notifyEvent);
      console.log('time is ' + this.notifyTime);
      console.log('date is ' + this.notifyDate);
    }



    //this.localNotifications.cancelAll();
      //console.log('cancelled');
    
    //return false;

    // this.localNotifications.schedule({
    //   id: 1,
    //   title: "Boat Boss",
    //   text: "Delayed Notification",
    //   at: new Date(new Date().getTime() + 5 * 1000),
    //   sound: null,
    //   icon: 'res://icon.png',
    // });
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

  addDailyNotification() {

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
