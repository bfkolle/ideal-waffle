import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  pieceType: string;
  pieceUrl: string;
  color: string;

  constructor(
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer,
    pieceType: string,
    color: string,
  ) {
    this.pieceType = 'black'; // TEMP
    this.color = 'white'; // TEMP
    this.pieceUrl = `assets/svg/${this.pieceType}-${this.color}.svg`;
    
    this.matIconRegistry.addSvgIcon(
      this.pieceType, 
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.pieceUrl));
  }

  ngOnInit(): void {
  }

}
