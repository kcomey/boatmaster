import { Observable } from 'rxjs/Observable';

export class LocationModel {
    location: any;
    locationObserver: any;

    constructor( public locationEntries: any[]) {
        this.locationEntries = locationEntries;

        this.location = Observable.create(observer => {
            this.locationObserver = observer;
        });
    }

    addLocation(item): void {
        this.locationEntries.push( item );

        this.locationObserver.next(true);
    }

    // removeItem(item): void {
    //     let index = this.items.indexOf(item);

    //     if (index > -1) {
    //         this.items.splice(index, 1);
    //     }

    //     this.locationObserver.next(true);
    // }

    // renameItem(item, title): void {
    //     let index = this.items.indexOf(item);

    //     if (index > -1) {
    //         this.items[index].title = title;
    //     }

    //     this.locationObserver.next(true);
    // }

    locationUpdates(): Observable<any> {
        return this.locationObserver;
    }
}