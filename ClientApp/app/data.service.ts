import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reminder } from './reminder';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

    private url = "/api/Reminders";

    constructor(private http: HttpClient) {
    }

    getReminders(): Observable<any> {
        return this.http.get(this.url);
    }

    createReminder(reminder: Reminder): Observable<any> {
        return this.http.post(this.url, reminder);
    }

    deleteReminder(id: number): Observable<any> {
        return this.http.delete(this.url + '/' + id);
    }
}