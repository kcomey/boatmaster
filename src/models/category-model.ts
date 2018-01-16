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
        //Add a budget entry
        this.items.push({
            date: item.date,
            amount: item.amount,
            details: item.details
        });

        this.categoryObserver.next(true);
    }

    removeEntry(item): void {
        //Remove a budget entry
        let index = this.items.indexOf(item);

        let creditAmount = this.items[index].amount;
        this.removeAmountSpent(creditAmount);

        if (index > -1) {
            this.items.splice(index, 1);
        }

        this.categoryObserver.next(true);
    }
    

    editEntry(data, item): void {
        //Edit a budget entry
        let index = this.items.indexOf(item);

        let creditAmount = this.items[index].amount;
        this.removeAmountSpent(creditAmount);

        //Debit amount
        this.setAmountSpent(data.amount);

        if (index > -1) {
            this.items[index].date = data.date;
            this.items[index].amount = data.amount;
            this.items[index].details = data.details;
        }

        this.categoryObserver.next(true);
    }

    removeItem(item): void {
        //Remove a budget category
        let index = this.items.indexOf(item);
        let creditAmount = this.items[index].amount;

        if (index > -1) {
            this.items.splice(index, 1);
        }

        this.removeAmountSpent(creditAmount);

        this.categoryObserver.next(true);
    }

    renameItem(item, title, amtAllocated): void {
        //Rename a budget category
        let index = this.items.indexOf(item);

        if (index > -1) {
            this.items[index].title = title;
            this.items[index].amtAllocated = amtAllocated;
        }

        this.categoryObserver.next(true);
    }

    setTitle(title): void {
        //Budget category title
        this.title = title;
        this.categoryObserver.next(true);
    }

    setAmountAllocated(amount): void {
        //Budget category amount allocated
        this.amtAllocated = Number(amount);
        this.categoryObserver.next(true);
    }

    setAmountSpent(amount): void {
        //Add to budget amount spent
        //Updated on each budget entry item
        this.amtSpent += Number(amount);
        this.categoryObserver.next(true);
    }

    removeAmountSpent(amount): void {
        //Subtract from budget amount spent
        //Updated on each budget entry item removed
        this.amtSpent -= Number(amount);
        this.categoryObserver.next(true);
    }

    categoryUpdates(): Observable<any> {
        return this.category;
    }
}