import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {

    private messageSource = new BehaviorSubject('');
    currentMessage = this.messageSource.asObservable();

    private closeWindow = new BehaviorSubject(false)
    currentWindowState = this.closeWindow.asObservable()

    constructor() {}

    changeMessage(message: string) {
        this.messageSource.next(message)
    }

    changeWindowState(value: boolean) {
        this.closeWindow.next(value)
    }
}