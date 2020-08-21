import { Component, OnInit } from '@angular/core';
import { Piece, PieceMove } from './../../models/piece';
import { BoardTile } from './../../models/board';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

const BACK_ROW_PIECES: string[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  chessPieces: Array<Array<Piece>> = [];
  boardPattern: number[][] = [];
  board: BoardTile[][] = [];

  constructor() { }

  ngOnInit(): void {
    this.boardPattern = this.setupBoardPattern();
    this.chessPieces = this.defaultChessBoard();
    this.board = this.setupBoard();
  }

  private sendMove(pieceMove: PieceMove): boolean {
    // if (moveValid(pieceMove)) { // Temporary, move validity logic check would go here
      // return this.socket.emit('sendMove', );
    // } else {
    return false;
    // }
  }

  public movePiece(event): void {
    console.log('event', event);
    if (event.previousContainer === event.container) {
      // Add replace and 'kill' piece logic here
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // This code needs reworking to fix current bug
      const [xVal, yVal] = this.decodeCoords(event.container.data.tileLocation);
      this.board[yVal][xVal] = event.container.data;
      console.log('xVal', xVal, 'yVal', yVal);
      console.log(this.board);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private decodeCoords(val: string)
  {
    const xVal: number = val.charCodeAt(0) - 65; // 65 is ASCII A, and we want A to equal 0. 65(A) - 65 = 0
    const yVal = val.substring(1);
    return [xVal, yVal];
  }

  private generateBackRow(color: string): Piece[] {
    return BACK_ROW_PIECES.map(piece => ({
        type: piece,
        color,
    }));
  }

  private generatePawnRow(color: string): Piece[] {
    const pawnRow: Piece[] = [];
    for (let index = 0; index < 8; index++) {
      pawnRow.push({
        type: 'pawn',
        color,
      });
    }
    return pawnRow;
  }

  private defaultChessBoard(): Piece[][] {
    const board = [];
    board[0] = this.generateBackRow('white');
    board[1] = this.generatePawnRow('white');
    board[2] = [];
    board[3] = [];
    board[4] = [];
    board[5] = [];
    board[6] = this.generatePawnRow('black');
    board[7] = this.generateBackRow('black');
    return board;
  }

  private setupBoardPattern(): number[][] {
    const board: number[][] = [];
    for (let i = 0; i < 8; i++) {
      board[i] = [];
      for (let j = 0; j < 8; j++) {
        board[i][j] = i + j;
      }
    }
    return board;
  }

  private setupBoard(): BoardTile[][] {
    return this.boardPattern.map((row, rowIndex) => {
      return row.map((tile, tileIndex) => {
        if (tile % 2 === 0) {
          return {
            piece: this.chessPieces[rowIndex][tileIndex],
            tileLocation: `${String.fromCharCode(65 + tileIndex)}${rowIndex + 1}`,
            isWhiteTile: true,
          };
        } else {
          return {
            piece: this.chessPieces[rowIndex][tileIndex],
            tileLocation: `${String.fromCharCode(65 + tileIndex)}${rowIndex + 1}`,
            isWhiteTile: false,
          };
        }
      });
    });
  }
}
