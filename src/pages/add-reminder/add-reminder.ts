import { Component } from '@angular/core';
import { Events, Platform, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  reminders: any = [];
  todayTime = new Date(new Date().getTime());

  constructor(public events: Events, public dataService: DataReminderProvider, public alertCtrl: AlertController, public localNotifications: LocalNotifications, public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
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
          reminders.forEach(item => {
            if (item.scheduleTime < this.todayTime && item.scheduleFrequency == "One Time") {
              console.log('do not add to the array, it must be expired');
            }
            else {
              this.reminders.push(item);
            }
          });
        }
      });
    });
  }

  timeChange(){
    this.chosenHours = moment(this.notifyTime).hour();
    this.chosenMinutes = moment(this.notifyTime).minute();
  }

  addOneTimeOrYearlyNotification(type) {
    let date = new Date();
    let notificationId = moment.utc(date); 
    let useId = Number(notificationId);

    let firstNotificationTime = new Date(this.notifyDate);
    firstNotificationTime.setHours(this.chosenHours);
    firstNotificationTime.setMinutes(this.chosenMinutes);

    //If user sets notification for past date, give error
    if (moment.utc(firstNotificationTime) < notificationId) {
      let alert = this.alertCtrl.create({
        title: 'Notification date cannot be in the past!',
        buttons: ['ok']
      });

      alert.present();
    }
    else {
        this.localNotifications.schedule({ 
          id: useId,
          title: "Boat Boss Reminder",
          text: this.notifyEvent,
          at: firstNotificationTime,
          every: type,
          sound: null,
          icon: 'res://icon.png',
        });

        if (type == 'year') {
          type = "Yearly";
        }
        else {
          type = "One Time";
        }
    
        let data = {
          id: useId,
          event: this.notifyEvent,
          scheduleFrequency: type,
          scheduleTime: firstNotificationTime
        };
    
        //Save to storage for future deletions
        //Can use built in functions I think
        this.reminders.push(data);
        this.dataService.save(this.reminders);
    
        this.events.publish('reminders', this.reminders);
        this.events.publish('showReminders', true);

        let alert = this.alertCtrl.create({
          title: 'Notification Set',
          buttons: ['ok']
        });

        alert.present();
        this.navCtrl.pop();
      }
  }

  addNotification(type) {
    let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.

    if (type == "One Time") {
      this.addOneTimeOrYearlyNotification(0);
    }
    else if (type == "Daily") {
      this.addDailyNotification();
    }
    else if (type == "Weekly") {
      //not done
      this.addWeeklyNotification();
    }
    else if (type == "Monthly") {
      //not done
      this.addMonthlyNotification();
    }
    else if (type == "Yearly") {
      this.addOneTimeOrYearlyNotification('year');
    }
    else {
      //not done
      this.addCustomNotification();
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
    let date = new Date();
    let notificationId = moment.utc(date); 
    let useId = Number(notificationId);

    //If time is earlier than current time, start notifications tomorrow
    let compareHour = moment(date).hour();
    let compareMinute = moment(date).minute();

    console.log('now hour ' + compareHour + ' and chosen hour ' + this.chosenHours);

    if (this.chosenHours < compareHour) {
      console.log('hours is less, go to next day');
    }
    if (this.chosenHours == compareHour) {
        if (this.chosenMinutes <= compareMinute) {
          console.log('also go to next day');
        }
    }

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
      at: formattedTime,
      every: 'day',
      sound: null,
      icon: 'res://icon.png',
    });

    let data = {
      id: useId,
      event: this.notifyEvent,
      scheduleFrequency: "Daily",
      scheduleTime: formattedTime
    };
    //Save to storage for future deletions
    this.reminders.push(data);
    this.dataService.save(this.reminders);

    this.events.publish('reminders', this.reminders);
    this.events.publish('showReminders', true);
    this.navCtrl.pop();
  }

  addCustomNotification() {

  }

  addMonthlyNotification() {

  }

  addWeeklyNotification() {
    let date = new Date();
    let notificationId = moment.utc(date); 
    let useId = Number(notificationId);

    let currentDay = date.getDay(); // Sunday = 0, Monday = 1, etc.
    let firstNotificationTime = new Date();
    let dayDifference = this.daySelected - currentDay;

    if(dayDifference < 0){
        dayDifference = dayDifference + 7; // for cases where the day is in the following week
    }
 
    firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
    firstNotificationTime.setHours(this.chosenHours);
    firstNotificationTime.setMinutes(this.chosenMinutes);

    this.localNotifications.schedule({
      id: useId,
      title: "Boat Boss Reminder!",
      text: this.notifyEvent,
      at: firstNotificationTime,
      every: 'week',
      sound: null,
      icon: 'res://icon.png',
    });

    let data = {
      id: useId,
      event: this.notifyEvent,
      scheduleFrequency: "Weekly",
      scheduleTime: firstNotificationTime
    };
    //Save to storage for future deletions
    this.reminders.push(data);
    this.dataService.save(this.reminders);

    this.events.publish('reminders', this.reminders);
    this.events.publish('showReminders', true);
    this.navCtrl.pop();

  }


}
