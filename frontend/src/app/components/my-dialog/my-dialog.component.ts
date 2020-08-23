import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MyDialogComponent>,
    private socket: Socket,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close();
    if (this.data.username == undefined){
      this.data.username = "guest";
    }
    console.log('Username is ' + this.data.username);
    this.socket.emit('addUser', this.data.username);
  }
}
