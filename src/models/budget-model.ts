import { Observable } from 'rxjs/Observable';

export class BudgetModel {
    budget: any;
    currentDate: string = new Date().toISOString().slice(0,16)

    // constructor(public date: string, public monthlyBudget: number, public monthlySpent: number,
    //     public monthlyAllocated: number, public categories: any[]) {
    // }

    // setMonthlyBudget(amount): void {
    //     this.monthlyBudget = Number(amount);
    // }

    // increaseAmountSpent(amount): void {
    //     this.monthlySpent += Number(amount);

    // }  

    // decreaseAmountSpent(amount): void {
    //     this.monthlySpent -= Number(amount);

    // }

    // increaseAmountAllocated(amount): void {
    //     this.monthlyAllocated += Number(amount);

    // } 
    
    // decreaseAmountAllocated(amount): void {
    //     this.monthlyAllocated -= Number(amount);

    // }

    // archive(data): void {
    //     //data will be all categories
    //     this.categories = data;

    // }

}