import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  @Input() piece: string;
  @Input() color: string;
  @Input() isDraggable: boolean;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      this.piece,
      this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/${this.piece}-${this.color}.svg`));
  }

}
