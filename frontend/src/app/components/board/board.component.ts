import { BoardService } from './../../services/board/board.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { PromoteDialogComponent } from './../promote-dialog/promote-dialog.component';
import { Piece } from './../../models/piece';
import { BoardTile } from './../../models/board';
import GameLogic from '../../models/gameLogic';

const BACK_ROW_PIECES: string[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  chessPieces: Array<Array<Piece>> = [];
  boardPattern: number[][] = [];
  board: BoardTile[][] = [];
  isTurn = false;
  gameStarted = false;
  playerColor: string;
  pawnPromotedTo: string;

  constructor(private socket: Socket, public dialog: MatDialog, private boardService: BoardService) {
    this.boardService.piecePromoted.subscribe((data) => {
      this.pawnPromotedTo = data;
    });
   }

  ngOnInit(): void {
    this.boardPattern = this.setupBoardPattern();
    this.chessPieces = this.defaultChessBoard();
    this.board = this.setupBoard();

    this.socket.on('yourTurn', () => {
      this.isTurn = true;
      console.log('my turn!');
    });

    this.socket.on('yourColor', (myColor) => {
      this.playerColor = myColor;
    });

    this.socket.on('moveMade', (newBoard) => {
      this.board = newBoard;
    });
  }

  private sendMove(): void {
    this.socket.emit('makeMove', this.board);
    this.isTurn = false;
  }

  public movePiece(event): void {
    if (event.previousContainer === event.container) {
      return;
    }
    else {
      const [xValNew, yValNew] = this.decodeCoords(event.container.data.tileLocation);
      const [xValOld, yValOld] = this.decodeCoords(event.previousContainer.data.tileLocation);
      const piece = this.board[yValOld][xValOld].piece;

      if (GameLogic.isPawnPromoting(piece, yValNew)) {
        this.promotePawn(yValOld, xValOld, yValNew, xValNew);
      } else if (GameLogic.isValidMove(piece, this.board, yValOld, xValOld, yValNew, xValNew, true))
      {
        this.board[yValNew][xValNew].piece = event.previousContainer.data.piece;
        this.board[yValOld][xValOld].piece = undefined;
        this.sendMove();
      } else {
        this.board[yValOld][xValOld].piece = event.previousContainer.data.piece;
      }
    }
  }

  private promotePawn(yValOld: number, xValOld: number, yValNew: number, xValNew: number): void {
    const ref = this.dialog.open(PromoteDialogComponent, {
      width: '250px',
      data: {playerColor: this.playerColor}
    });

    ref.afterClosed().subscribe(() => {
      this.board[yValNew][xValNew].piece = {
        ...this.board[yValOld][xValOld].piece,
        type: this.pawnPromotedTo,
      };
      this.board[yValOld][xValOld].piece = undefined;
      this.sendMove();
      console.log('Pawn promotion was successful', this.pawnPromotedTo);
    });
  }

  private decodeCoords(val: string): number[]
  {
    const xVal: number = val.charCodeAt(0) - 65; // 65 is ASCII A, and we want A to equal 0. 65(A) - 65 = 0
    const yVal: number = parseInt(val.substring(1), 10) - 1;
    return [xVal, yVal];
  }

  private generateBackRow(color: string): Piece[] {
    return BACK_ROW_PIECES.map(piece => ({
        type: piece,
        color
    }));
  }

  private generatePawnRow(color: string): Piece[] {
    const pawnRow: Piece[] = [];
    for (let index = 0; index < 8; index++) {
      pawnRow.push({
        type: 'pawn',
        color
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
            isEnPassant: false,
          };
        } else {
          return {
            piece: this.chessPieces[rowIndex][tileIndex],
            tileLocation: `${String.fromCharCode(65 + tileIndex)}${rowIndex + 1}`,
            isWhiteTile: false,
            isEnPassant: false,
          };
        }
      });
    });
  }

  startGame(): void  {
    this.socket.emit('startGame');
    this.gameStarted = true;
  }

}
