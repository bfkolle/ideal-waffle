import { Piece } from './../../models/piece';
import { Component, OnInit } from '@angular/core';

const BACK_ROW_PIECES: string[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

function generateBackRow(color: string): Piece[] {
  return BACK_ROW_PIECES.map((piece, index) => {
    const location = color === 'white'
    ? `${String.fromCharCode(65 + index)}1`
    : `${String.fromCharCode(65 + index)}8`;
    return {
      type: piece,
      color,
      location,
    };
  });
}

function generatePawnRow(color: string): Piece[] {
  const pawnRow: Piece[] = [];
  for (let index = 0; index < 8; index++) {
    const location = color === 'white'
    ? `${String.fromCharCode(65 + index)}2`
    : `${String.fromCharCode(65 + index)}7`;
    pawnRow.push({
      type: 'pawn',
      color,
      location
    });
  }
  return pawnRow;
}

const defaultChessBoard = (): Piece[][] => {
  const board = [];
  board[0] = generateBackRow('white');
  board[1] = generatePawnRow('white');
  board[2] = [];
  board[3] = [];
  board[4] = [];
  board[5] = [];
  board[6] = generatePawnRow('black');
  board[7] = generateBackRow('black');

  return board;
};

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  chessPieces: Array<Array<Piece>> = [];
  // currentPiece = 'pawn'; // This is for testing, plan on this being dynamic
  // currentColor = 'black'; // This is for testing, plan on this being dynamic
  board: number[][];

  constructor(
  ) { }

  ngOnInit(): void {
    this.board = [];
    for (let i = 0; i < 8; i++)
    {
      this.board[i] = [];
      for (let j = 0; j < 8; j++)
      {
        this.board[i][j] = i + j;
      }
    }

    this.chessPieces = defaultChessBoard();
  }
}
