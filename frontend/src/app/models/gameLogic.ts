import { Piece } from './piece';
import { BoardTile } from './board';

export class gameLogic {
    static isValidMove(piece: Piece, board: BoardTile[][], 
                       yValOld: number, xValOld: number, yValNew: number, xValNew: number) {
        // if !inCheckState
        // else
        let capturedPiece: Piece;

        console.log(board);
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
                if(Math.abs(yValOld-yValNew)==1 && (xValOld == xValNew)) { // THIS DOESNT TAKE INTO ACCOUNT PAWN CAPTURING DIAGONALLY
                    return true;                                       // THIS ALSO DOESNT TAKE INTO ACCOUNT A PAWN CAN MOVE TWO SPACES IN ITS FIRST MOVE
                }
            }
            case 'king': {
                let xDelta = Math.abs(xValOld-xValNew);
                let yDelta = Math.abs(yValOld-yValNew);
                
                if(xDelta <= 1 && yDelta <= 1)
                {
                    console.log("Here");
                    return true;
                }
                return false;
            }
            case 'rook': {
                if(yValOld == yValNew || xValOld == xValNew)
                {
                    return true;
                }
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
        return false;
    }
}