export interface Piece {
    type: string;
    color: string;
}

export interface PieceMove {
    type: string;
    color: string;
    locationStart: string;
    locationEnd: string;
}
