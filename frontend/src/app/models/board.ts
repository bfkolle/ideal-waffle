import { Piece } from './piece';

export interface BoardTile {
    piece: Piece;
    isWhiteTile: boolean;
}
