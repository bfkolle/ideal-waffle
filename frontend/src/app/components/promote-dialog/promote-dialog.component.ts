import { BoardService } from './../../services/board/board.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const PROMOTE_SELECTIONS = ['queen', 'rook', 'knight', 'bishop'];

@Component({
  selector: 'app-promote-dialog',
  templateUrl: './promote-dialog.component.html',
  styleUrls: ['./promote-dialog.component.css']
})
export class PromoteDialogComponent implements OnInit {
  promoteSelections = PROMOTE_SELECTIONS;
  playerColor: string;

  constructor(
    private boardService: BoardService,
    public dialogRef: MatDialogRef<PromoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.playerColor = this.data.playerColor;
  }

  public selectPiece(promoteSelection: string): void {
    this.boardService.sendPromotePiece(promoteSelection);
    this.dialogRef.close();
  }
}
