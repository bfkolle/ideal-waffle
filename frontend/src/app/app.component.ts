import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentPiece = 'pawn'; // This is for testing, plan on this being dynamic
  currentColor = 'black'; // This is for testing, plan on this being dynamic
  title = 'frontend';
}
