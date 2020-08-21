export interface Piece {
    type: string;
    color: string;
    location: string;
}

export interface PieceMove {
    type: string;
    color: string;
    locationStart: string;
    locationEnd: string;
}
