import {BehaviorSubject} from "rxjs";


export class DataRxJs<T>{
    private dataSubject = new BehaviorSubject<T>(this.initialData);
    data$ = this.dataSubject.asObservable();

    constructor(public initialData: T){}

    updateData$(data: T): void{
        this.dataSubject.next(data);
    }
}