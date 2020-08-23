import { Piece } from './piece';
import { BoardTile } from './board';

export class gameLogic {
    static isValidMove(piece: Piece, board: BoardTile[][], 
                       yValOld: number, xValOld: number, yValNew: number, xValNew: number, checkValidation: boolean) {
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

        if (checkValidation) {
            if(this.moveCausesCheck(piece, board, yValOld, xValOld, yValNew, xValNew)) {
                console.log("Can't place yourself in check");
                return false;
            }
        }

        switch(piece.type) {
            case 'pawn': {
                // Each color's piece to only move forward
                if(piece.color == 'black' && yValNew < yValOld || piece.color == 'white' && yValNew > yValOld) {
                    
                    // This deals with non-capturing, only move 1-2 spaces forward
                    if(xValOld == xValNew) {
                        // Black pawns moving 2 spaces
                        if(piece.color == 'black' && yValOld == 6 && yValNew == 4 && board[5][xValOld].piece == undefined){
                            board[yValOld - 1][xValNew].isEnPassant = true;
                            return true;
                        }

                        // White pawns moving 2 spaces
                        if(piece.color == 'white' && yValOld == 1 && yValNew == 3 && board[2][xValOld].piece == undefined){
                            board[yValNew - 1][xValNew].isEnPassant = true;
                            return true;
                        }
                        
                        // THIS DOESNT TAKE INTO ACCOUNT PAWN CAPTURING DIAGONALLY
                        if(Math.abs(yValOld-yValNew)==1) {
                            if(board[yValNew][xValNew].piece != undefined)
                                return false;
                            if(board[yValOld - 1][xValNew].isEnPassant == true)
                                board[yValOld - 1][xValNew].isEnPassant = false;
                            else if(board[yValOld + 1][xValNew].isEnPassant == true)
                                board[yValNew - 1][xValNew].isEnPassant = false;
                            
                            return true;
                        }
                    }
                    else {
                        // Check if diagonal move is valid, then if a piece is there
                        if(Math.abs(xValOld-xValNew) == 1 && Math.abs(yValOld-yValNew) == 1 && board[yValNew][xValNew].piece != undefined) {
                            return true;
                        }
                        else if(Math.abs(xValOld-xValNew) == 1 && Math.abs(yValOld-yValNew) == 1 && board[yValNew][xValNew].isEnPassant == true) {
                            if(board[yValNew - 1][xValNew].piece != undefined && board[yValNew - 1][xValNew].piece.type === 'pawn' && board[yValNew - 1][xValNew].piece.color != piece.color) {
                                board[yValNew - 1][xValNew].piece = undefined;
                                return true;
                            }
                            else if(board[yValNew + 1][xValNew].piece != undefined && board[yValNew + 1][xValNew].piece.type === 'pawn' && board[yValNew + 1][xValNew].piece.color != piece.color) {
                                board[yValNew + 1][xValNew].piece = undefined;
                                return true;
                            }
                                
                            return false;
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
                if(yValOld == yValNew)
                {
                    if (xValNew - xValOld > 0)
                    {
                        for (let i: number = xValOld + 1; i < xValNew; i++) {
                            if(board[yValOld][i].piece != undefined)
                                return false;
                        }
                    }
                    else
                    {
                        for (let i: number = xValOld - 1; i > xValNew; i--) {
                            if(board[yValOld][i].piece != undefined)
                                return false;
                        }
                    }
                    
                    return true;
                }
                else if(xValOld == xValNew)
                {
                    if (yValNew - yValOld > 0)
                    {
                        for (let i: number = yValOld + 1; i < yValNew; i++) {
                            if(board[i][xValOld].piece != undefined)
                                return false;
                        }
                    }
                    else
                    {
                        for (let i: number = yValOld - 1; i > yValNew; i--) {
                            if(board[i][xValOld].piece != undefined)
                                return false;
                        }
                    }

                    return true;
                }
                break;
            }
            case 'bishop': {
				
				let xDelta = Math.abs(xValOld-xValNew);
                let yDelta = Math.abs(yValOld-yValNew);
				
                if(xDelta == yDelta) 
                {
                    const xVal = xValOld;
                    
                    if(xValNew - xValOld > 0)
                    {
                        if (yValNew - yValOld > 0)
                        {
                            for (let i: number = yValOld + 1; i < yValNew; i++) {
                                if(board[i][xVal].piece != undefined)
                                    return false;
                                
                                    xVal++;
                            }
                        }
                        else
                        {
                            for (let i: number = yValOld - 1; i > yValNew; i--) {
                                if(board[i][xVal].piece != undefined)
                                    return false;

                                    xVal++;
                            }
                        }
                    }
                    else
                    {
                        if (yValNew - yValOld > 0)
                        {
                            for (let i: number = yValOld + 1; i < yValNew; i++) {
                                if(board[i][xVal].piece != undefined)
                                    return false;
                                
                                    xVal--
                            }
                        }
                        else
                        {
                            for (let i: number = yValOld - 1; i > yValNew; i--) {
                                if(board[i][xVal].piece != undefined)
                                    return false;

                                    xVal--
                            }
                        }
                    }

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

        return false;
    }

    static moveCausesCheck(piece: Piece, board: BoardTile[][], yValOld: number, xValOld: number, yValNew: number, xValNew: number): boolean {
        if(this.isValidMove(piece, board, yValOld, xValOld, yValNew, xValNew, false)) {
            let tempPiece: Piece = board[yValNew][xValNew].piece;
            board[yValNew][xValNew].piece = board[yValOld][xValOld].piece;
            board[yValOld][xValOld].piece = undefined;
            
            let color: string = board[yValNew][xValNew].piece.color;
            let kingCoords: number[] = this.findKingLocation(color, board);
            let xValKing: number = kingCoords[0];
            let yValKing: number = kingCoords[1];

            for (let i: number = 0; i < 8; i++) {
                for (let j: number = 0; j < 8; j++) {
                    let temp2Piece: Piece = board[i][j].piece;

                    if (temp2Piece != undefined && temp2Piece.color != color && this.isValidMove(temp2Piece, board, i, j, yValKing, xValKing, true)) {
                        board[yValOld][xValOld].piece = board[yValNew][xValNew].piece;
                        board[yValNew][xValNew].piece = tempPiece;
                        return true;
                    }
                }
            }
            
            board[yValOld][xValOld].piece = board[yValNew][xValNew].piece;
            board[yValNew][xValNew].piece = tempPiece;
            return false;
        }

        return false;
    }

    static findKingLocation(color: string, board: BoardTile[][]): [number, number] {
        for (let i: number = 0; i < 8; i++) {
            for (let j: number = 0; j < 8; j++) {
                let tempPiece: Piece = board[i][j].piece;

                if (tempPiece != undefined && tempPiece.color === color && tempPiece.type === 'king') {
                    return [j, i];
                }
            }
        }
    }
}