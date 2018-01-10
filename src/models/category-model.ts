import { Observable } from 'rxjs/Observable';

export class CategoryModel {
    category: any;
    categoryObserver: any;
    date: string = Date();

    constructor(public title: string, public amtAllocated: number, public amtSpent: number, public items: any[] ) {
        this.items = items;
        
        this.category = Observable.create(observer => {
            this.categoryObserver = observer;
        });
    }

    addEntry(item): void {
        //Adding a budget category item
        this.items.push({
            date: item.date,
            amount: item.amount,
            details: item.details
        });

        this.categoryObserver.next(true);
    }

    removeEntry(item): void {
        let index = this.items.indexOf(item);

        if (index > -1) {
            this.items.splice(index, 1);
        }

        this.categoryObserver.next(true);
    }
    

    editEntry(data, item): void {
        let index = this.items.indexOf(item);

        if (index > -1) {
            this.items[index].date = data.date;
            this.items[index].amount = data.amount;
            this.items[index].details = data.details;
        }

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
        this.amtAllocated = Number(amount);
        this.categoryObserver.next(true);
    }

    setAmountSpent(amount): void {
        this.amtSpent += Number(amount);
        this.amtAllocated -= Number(amount);
        this.categoryObserver.next(true);
    }

    categoryUpdates(): Observable<any> {
        return this.category;
    }
}