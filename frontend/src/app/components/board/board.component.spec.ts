import { BoardTile } from './../../models/board';
import { BoardService } from './../../services/board/board.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { BoardComponent } from './board.component';
import GameLogic from 'src/app/models/gameLogic';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

const mockedBoard: BoardTile[][] = [
  [
    {
      piece: {
        type: 'rook',
        color: 'white',
        canCastle: true
      },
      tileLocation: 'A1',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: {
        type: 'knight',
        color: 'white',
        canCastle: true
      },
      tileLocation: 'B1',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: {
        type: 'bishop',
        color: 'white',
        canCastle: true
      },
      tileLocation: 'C1',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: {
        type: 'queen',
        color: 'white',
        canCastle: true
      },
      tileLocation: 'D1',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: {
        type: 'king',
        color: 'white',
        canCastle: true
      },
      tileLocation: 'E1',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: {
        type: 'bishop',
        color: 'white',
        canCastle: true
      },
      tileLocation: 'F1',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: {
        type: 'knight',
        color: 'white',
        canCastle: true
      },
      tileLocation: 'G1',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: {
        type: 'rook',
        color: 'white',
        canCastle: true
      },
      tileLocation: 'H1',
      isWhiteTile: false,
      isEnPassant: false
    }
  ],
  [
    {
      piece: {
        type: 'pawn',
        color: 'white',
        canCastle: false
      },
      tileLocation: 'A2',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: {
        type: 'pawn',
        color: 'white',
        canCastle: false
      },
      tileLocation: 'B2',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: {
        type: 'pawn',
        color: 'white',
        canCastle: false
      },
      tileLocation: 'C2',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: {
        type: 'pawn',
        color: 'white',
        canCastle: false
      },
      tileLocation: 'D2',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: {
        type: 'pawn',
        color: 'white',
        canCastle: false
      },
      tileLocation: 'E2',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: {
        type: 'pawn',
        color: 'white',
        canCastle: false
      },
      tileLocation: 'F2',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: {
        type: 'pawn',
        color: 'white',
        canCastle: false
      },
      tileLocation: 'G2',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: {
        type: 'pawn',
        color: 'white',
        canCastle: false
      },
      tileLocation: 'H2',
      isWhiteTile: true,
      isEnPassant: false
    }
  ],
  [
    {
      piece: undefined,
      tileLocation: 'A3',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'B3',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'C3',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'D3',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'E3',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'F3',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'G3',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'H3',
      isWhiteTile: false,
      isEnPassant: false
    }
  ],
  [
    {
      piece: undefined,
      tileLocation: 'A4',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'B4',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'C4',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'D4',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'E4',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'F4',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'G4',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'H4',
      isWhiteTile: true,
      isEnPassant: false
    }
  ],
  [
    {
      piece: undefined,
      tileLocation: 'A5',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'B5',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'C5',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'D5',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'E5',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'F5',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'G5',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'H5',
      isWhiteTile: false,
      isEnPassant: false
    }
  ],
  [
    {
      piece: undefined,
      tileLocation: 'A6',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'B6',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'C6',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'D6',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'E6',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'F6',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'G6',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: undefined,
      tileLocation: 'H6',
      isWhiteTile: true,
      isEnPassant: false
    }
  ],
  [
    {
      piece: {
        type: 'pawn',
        color: 'black',
        canCastle: false
      },
      tileLocation: 'A7',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: {
        type: 'pawn',
        color: 'black',
        canCastle: false
      },
      tileLocation: 'B7',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: {
        type: 'pawn',
        color: 'black',
        canCastle: false
      },
      tileLocation: 'C7',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: {
        type: 'pawn',
        color: 'black',
        canCastle: false
      },
      tileLocation: 'D7',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: {
        type: 'pawn',
        color: 'black',
        canCastle: false
      },
      tileLocation: 'E7',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: {
        type: 'pawn',
        color: 'black',
        canCastle: false
      },
      tileLocation: 'F7',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: {
        type: 'pawn',
        color: 'black',
        canCastle: false
      },
      tileLocation: 'G7',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: {
        type: 'pawn',
        color: 'black',
        canCastle: false
      },
      tileLocation: 'H7',
      isWhiteTile: false,
      isEnPassant: false
    }
  ],
  [
    {
      piece: {
        type: 'rook',
        color: 'black',
        canCastle: true
      },
      tileLocation: 'A8',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: {
        type: 'knight',
        color: 'black',
        canCastle: true
      },
      tileLocation: 'B8',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: {
        type: 'bishop',
        color: 'black',
        canCastle: true
      },
      tileLocation: 'C8',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: {
        type: 'queen',
        color: 'black',
        canCastle: true
      },
      tileLocation: 'D8',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: {
        type: 'king',
        color: 'black',
        canCastle: true
      },
      tileLocation: 'E8',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: {
        type: 'bishop',
        color: 'black',
        canCastle: true
      },
      tileLocation: 'F8',
      isWhiteTile: true,
      isEnPassant: false
    },
    {
      piece: {
        type: 'knight',
        color: 'black',
        canCastle: true
      },
      tileLocation: 'G8',
      isWhiteTile: false,
      isEnPassant: false
    },
    {
      piece: {
        type: 'rook',
        color: 'black',
        canCastle: true
      },
      tileLocation: 'H8',
      isWhiteTile: true,
      isEnPassant: false
    }
  ]
];

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        SocketIoModule.forRoot(config),
      ],
      providers: [BoardService],
      declarations: [ BoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup board correctly', () => {
    expect(component.board).toEqual(mockedBoard);
  });

  it('test pawn promoting game logic', () => {
    const whitePawnAtEndOfBoard = GameLogic.isPawnPromoting({
      type: 'pawn',
      color: 'white',
      canCastle: false,
    }, 7);
    const blackPawnAtEndOfBoard = GameLogic.isPawnPromoting({
      type: 'pawn',
      color: 'black',
      canCastle: false,
    }, 0);
    const pawnInMiddleOfBoard = GameLogic.isPawnPromoting({
      type: 'pawn',
      color: 'white',
      canCastle: false,
    }, 4);
    const queenAtEndOfBoard = GameLogic.isPawnPromoting({
      type: 'queen',
      color: 'white',
      canCastle: false,
    }, 7);
    const queenInMiddleOfBoard = GameLogic.isPawnPromoting({
      type: 'queen',
      color: 'white',
      canCastle: false,
    }, 5);

    expect(whitePawnAtEndOfBoard).toBe(true);
    expect(blackPawnAtEndOfBoard).toBe(true);
    expect(pawnInMiddleOfBoard).toBe(false);
    expect(queenAtEndOfBoard).toBe(false);
    expect(queenInMiddleOfBoard).toBe(false);
  });

  it('test isValidMove function of GameLogic', () => {
    const validTestMove = GameLogic.isValidMove({
      type: 'knight',
      color: 'white',
      canCastle: false,
    }, mockedBoard, 0, 1, 2, 0, true);
    const nonValidTestMove = GameLogic.isValidMove({
      type: 'queen',
      color: 'white',
      canCastle: false,
    }, mockedBoard, 0, 3, 3, 3, true);

    expect(validTestMove).toBe(true);
    expect(nonValidTestMove).toBe(false);
  });

  it('decodeCoords function works', () => {
    const decodedCoords = component.decodeCoords('A1');
    expect(decodedCoords).toEqual([0, 0]);
  });
});
