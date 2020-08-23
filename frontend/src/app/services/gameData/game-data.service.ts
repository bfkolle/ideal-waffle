import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameData {
  getUsername$: Observable<any>;
  private getData = new Subject<any>();

  constructor() {
      this.getUsername$ = this.getData.asObservable();
  }

  myMethod(data) {
      this.getData.next(data);
  }
}