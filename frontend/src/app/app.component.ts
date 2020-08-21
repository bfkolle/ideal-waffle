import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { MyDialogComponent } from './components/my-dialog/my-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Chessborne';
  username: string;

  constructor(public dialog: MatDialog, private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.openDialog();
  }


  public openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {username: this.username}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
