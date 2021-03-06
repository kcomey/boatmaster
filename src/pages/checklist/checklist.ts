import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform } from 'ionic-angular';
import { ChecklistDetailPage } from '../../pages/checklist-detail/checklist-detail';
import { ChecklistModel } from '../../models/checklist-model';
import { DataChecklistProvider } from '../../providers/data-checklist/data-checklist';
import { Keyboard } from '@ionic-native/keyboard';
import { ItemSliding } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-checklist',
  templateUrl: 'checklist.html',
})
export class ChecklistPage {
  checklists: ChecklistModel[] = [];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public platform: Platform, 
    public keyboard: Keyboard, public dataService: DataChecklistProvider) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.dataService.getData().then((checklists) => {
        let savedChecklists: any = false;

        if (typeof(checklists) != "undefined") {
          savedChecklists = JSON.parse(checklists);
        }

        if (savedChecklists) {
          savedChecklists.forEach(savedChecklist => {
            let loadChecklist = new ChecklistModel(savedChecklist.title, savedChecklist.items);

            this.checklists.push(loadChecklist);

            loadChecklist.checklistUpdates().subscribe(update => {
              this.save();
            });
          });
        }
      });
    });
  }

  addChecklist(): void {
    let prompt = this.alertCtrl.create({
      title: 'New Checklist',
      message: 'Enter the name of your new checklist below:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            let newChecklist = new ChecklistModel(data.name, []);
            this.checklists.push(newChecklist);

            newChecklist.checklistUpdates().subscribe(update => {
              this.save();
            });

            this.save();
          }
        }
      ]
    });

    prompt.present();
  }

  renameChecklist(checklist, slidingItem: ItemSliding): void {
    let prompt = this.alertCtrl.create({
      title: 'Rename Checklist',
      message: 'Enter the new name of this checklist below:',
      inputs: [
        {
          name: 'name',
          value: checklist.title
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            slidingItem.close();
          }
        },
        {
          text: 'Save',
          handler: data => {
            let index = this.checklists.indexOf(checklist);

            if (index > -1) {
              this.checklists[index].setTitle(data.name);
              this.save();
              slidingItem.close();
            }
          }
        }
      ]
    });

    prompt.present();

  }

  viewChecklist(checklist): void {
    this.navCtrl.push(ChecklistDetailPage, {
      checklist: checklist
    });
  }

  removeChecklist(checklist, slidingItem: ItemSliding): void {
    let index = this.checklists.indexOf(checklist);

    if (index > -1) {
      this.checklists.splice(index, 1);
      this.save();
      slidingItem.close();
    }

  }

  save(): void {
    this.keyboard.close();
    this.dataService.save(this.checklists);
  }

}
