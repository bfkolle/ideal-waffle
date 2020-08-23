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
                            board[yValOld - 1][xValNew].isEnPassant = true;
                            console.log(board);
                            return true;
                        }

                        // White pawns moving 2 spaces
                        if(piece.color == 'white' && yValOld == 1 && yValNew == 3){
                            board[yValNew - 1][xValNew].isEnPassant = true;
                            console.log(board);
                            return true;
                        }
                        
                        // THIS DOESNT TAKE INTO ACCOUNT PAWN CAPTURING DIAGONALLY
                        if(Math.abs(yValOld-yValNew)==1) {
                            if(board[yValOld - 1][xValNew].isEnPassant == true)
                            {
                                console.log('R');
                                board[yValOld - 1][xValNew].isEnPassant = false;
                            }
                            else if(board[yValOld + 1][xValNew].isEnPassant == true)
                            {
                                console.log('E');
                                board[yValNew - 1][xValNew].isEnPassant = false;
                            }
                            
                            console.log(board);
                            return true;
                        }
                    }
                    else {
                        // Check if diagonal move is valid, then if a piece is there
                        console.log(board[yValNew][xValNew]);
                        if(Math.abs(xValOld-xValNew) == 1 && Math.abs(yValOld-yValNew) == 1 && board[yValNew][xValNew].piece != undefined) {
                            return true;
                        }
                        else if(Math.abs(xValOld-xValNew) == 1 && Math.abs(yValOld-yValNew) == 1 && board[yValNew][xValNew].isEnPassant == true) {
                            if(board[yValNew - 1][xValNew].piece != undefined && board[yValNew - 1][xValNew].piece.type === 'pawn')
                                board[yValNew - 1][xValNew].piece = undefined;
                            else if(board[yValNew + 1][xValNew].piece != undefined && board[yValNew + 1][xValNew].piece.type === 'pawn')
                                board[yValNew + 1][xValNew].piece = undefined;
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
				
				let xDelta = Math.abs(xValOld-xValNew);
                let yDelta = Math.abs(yValOld-yValNew);
				
                if(xDelta == yDelta) 
                {
                    return true;
                }
				break;
            }
            case 'knight': {
				
				let xDelta = Math.abs(xValOld-xValNew);
                let yDelta = Math.abs(yValOld-yValNew);
				
                if(xDelta == 1 && yDelta == 2 || xDelta == 2 && yDelta == 1) 
                {
                    return true;
                }
				break;
            }
            case 'queen': {
				
				let xDelta = Math.abs(xValOld-xValNew);
                let yDelta = Math.abs(yValOld-yValNew);
				
                if(xDelta == yDelta || (yValOld == yValNew || xValOld == xValNew)) 
                {         
                    return true;
                }
				break;
            }
        }
    }
}