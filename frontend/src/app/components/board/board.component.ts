import { Component, OnInit } from '@angular/core';
import { Piece } from '../../models/Piece';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  pieces:Array<Piece> = [];
  piece:Piece;

  constructor() {}

  pieceImg = '/assets/Chessboard.png';

  ngOnInit(): void {

    for(let i = 0; i < 16; i++)
    {
      let xVal = (i*60) % 480;
      let yVal = (Math.floor(i/8)) * 56 + 48;
      this.piece = new Piece('King', '/assets/King.png', xVal, yVal);
      this.pieces.push(this.piece);
    }

  }

}
