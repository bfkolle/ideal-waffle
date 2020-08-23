export interface Piece {
    type: string;
    color: string;
    isDraggable: boolean;
}

export interface PieceMove {
    type: string;
    color: string;
    locationStart: string;
    locationEnd: string;
}
