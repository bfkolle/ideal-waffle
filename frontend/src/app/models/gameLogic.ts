import { Piece } from './piece';
import { BoardTile } from './board';

export class gameLogic {
    static isValidMove(piece: Piece, board: BoardTile[][], 
                       yValOld: number, xValOld: number, yValNew: number, xValNew: number) {
        // if !inCheckState
        // else
        let capturedPiece: Piece;

        if(board[yValNew][xValNew].piece != undefined)
            capturedPiece = board[yValNew][xValNew].piece;

        if(capturedPiece != undefined && capturedPiece.color == piece.color) // If landing piece has the same color as moving piece
        {
            console.log("Can't capture your own pieces!");
            return false;
        }

        // if pieceBetweenMove()
        // "Can't move past pieces!"

        // if moveCausesCheck()
        // "Can't put yourself into check!"

        switch(piece.type) {
            case 'pawn': {
                // Each color's piece to only move forward
                if(piece.color == 'black' && yValNew < yValOld || piece.color == 'white' && yValNew > yValOld) {
                    
                    // This deals with non-capturing, only move 1-2 spaces forward
                    if(xValOld == xValNew) {
                        // Black pawns moving 2 spaces
                        if(piece.color == 'black' && yValOld == 6 && yValNew == 4){
                            return true;
                        }

                        // White pawns moving 2 spaces
                        if(piece.color == 'white' && yValOld == 1 && yValNew == 3){
                            return true;
                        }
                        
                        // THIS DOESNT TAKE INTO ACCOUNT PAWN CAPTURING DIAGONALLY
                        if(Math.abs(yValOld-yValNew)==1) { 
                            return true;
                        }
                    }
                    else {
                        // Check if diagonal move is valid, then if a piece is there
                        if(Math.abs(xValOld-xValNew) == 1 && Math.abs(yValOld-yValNew) == 1 && board[yValNew][xValNew].piece != undefined) {
                            return true;
                        }
                    }
                    
                }
                break;
            }
            case 'king': {
                let xDelta = Math.abs(xValOld-xValNew);
                let yDelta = Math.abs(yValOld-yValNew);
                
                if(xDelta <= 1 && yDelta <= 1)
                {
                    return true;   
                }
                break;
            }
            case 'rook': {
                if(yValOld == yValNew || xValOld == xValNew)
                {
                    return true;
                }
                break;
            }
            case 'bishop': {
                if(false) // I spent too much time thinking of this conditional and couldn't get it, sorry
                {
                    return true;
                }
            }
            case 'knight': {
                if(false) // I'm not even attempting this one
                {
                    return true;
                }
            }
            case 'queen': {
                if(false) // Diagonally or horizontally or vertically (Basically a rook or a bishop)
                {         // (The pieceBetweenMove() will fail if it moves through a piece)
                    return true;
                }
            }
        }
    }
}