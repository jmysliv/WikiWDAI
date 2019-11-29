import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private subject = new Subject<any>();

  sendFilter(filter) {
      this.subject.next(filter);
  }

  clearFilter() {
      this.subject.next();
  }

  getFilter(): Observable<any> {
      return this.subject.asObservable();
  }
  constructor() { }
}
