export class Piece {   

    constructor(_name:String, _imgSrc:String, _xCoord:number, _yCoord:number){
        this.name=_name;
        this.imgSrc=_imgSrc;
        this.xCoord=_xCoord;
        this.yCoord=_yCoord
    }

    name:String;
    imgSrc:String;
    xCoord:number;
    yCoord:number;
}