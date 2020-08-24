import { Piece } from './piece';

export interface BoardTile {
    piece: Piece;
    tileLocation: string;
    isWhiteTile: boolean;
    isEnPassant: boolean;
}
