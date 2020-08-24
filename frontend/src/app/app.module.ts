import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';

import { PieceComponent } from './components/piece/piece.component';
import { BoardComponent } from './components/board/board.component';
import { MyDialogComponent } from './components/my-dialog/my-dialog.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PromoteDialogComponent } from './components/promote-dialog/promote-dialog.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PieceComponent,
    BoardComponent,
    MyDialogComponent,
    PromoteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatGridListModule,
    DragDropModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
