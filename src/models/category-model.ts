import { Observable } from 'rxjs/Observable';

export class CategoryModel {
    category: any;
    categoryObserver: any;
    date: string = Date();

    constructor(public title: string, public amtAllocated: number, public items: any[] ) {
        this.items = items;
        
        this.category = Observable.create(observer => {
            this.categoryObserver = observer;
        });
    }

    addItem(item, amtAllocated): void {
        this.items.push({
            title: item,
            amtAllocated: amtAllocated
        });

        this.categoryObserver.next(true);
    }

    removeItem(item): void {
        let index = this.items.indexOf(item);

        if (index > -1) {
            this.items.splice(index, 1);
        }

        this.categoryObserver.next(true);
    }

    renameItem(item, title, amtAllocated): void {
        let index = this.items.indexOf(item);

        if (index > -1) {
            this.items[index].title = title;
            this.items[index].amtAllocated = amtAllocated;
        }

        this.categoryObserver.next(true);
    }

    setTitle(title): void {
        this.title = title;
        this.categoryObserver.next(true);
    }

    setAmount(amount): void {
        this.amtAllocated = amount;
        this.categoryObserver.next(true);
    }

    categoryUpdates(): Observable<any> {
        return this.category;
    }
}