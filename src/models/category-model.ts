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

    removeEntry(index): void {
        if (index > -1) {
          this.items.splice(index, 1);          
        }

        this.categoryObserver.next(true);
    }

    editEntry(item): void {
        
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

    setAmountSpent(amount): void {
        this.amtSpent += amount;
        this.amtAllocated -= amount;
        this.categoryObserver.next(true);
    }

    categoryUpdates(): Observable<any> {
        return this.category;
    }

    categoryEntryUpdates(): Observable<any> {
        return this.category.items;
    }
}