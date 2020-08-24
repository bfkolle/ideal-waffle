import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  piecePromoted: Observable<any>;
  private sendPromotePieceSubject = new Subject<any>();

  constructor() {
    this.piecePromoted = this.sendPromotePieceSubject.asObservable();
  }

  sendPromotePiece(data: string): void {
    this.sendPromotePieceSubject.next(data);
  }
}
