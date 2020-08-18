import { Injectable } from '@angular/core';


/**
 * This will eventually house the logic of a piece
 */
@Injectable({
  providedIn: 'root'
})
export class PieceService {
  location: string; // Layman term's location, ex. a1, c5, h8
  locationArray: {x: number, y: number}; // 2d array location

  constructor() { }
}
