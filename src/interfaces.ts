export type Coordinate = 0 | 1 | 2;

export interface Coordinates {
  x: Coordinate;
  y: Coordinate;
}

export enum Marker {
  Nought = "O",
  Cross = "X",
}

export interface Square {
  isOccupied: Boolean;
}

export type Turn = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface OccupiedSquare extends Square {
  marker: Marker;
  turn: Turn;
}

export interface UnoccupiedSquare extends Square {
  isOccupied: false;
}

export const anUnoccupiedSquare: UnoccupiedSquare = { isOccupied: false };

export type GameBoard = [
  [Square, Square, Square],
  [Square, Square, Square],
  [Square, Square, Square]
];

export enum GameStatus {
  NoughtWin = "Nought Win",
  CrossWin = "Cross Win",
  Draw = "Draw",
  Unfinished = "Unfinished",
}

export interface Game {
  gameBoard: GameBoard;
  placeMarker: (marker: Marker) => GameBoard;
  gameStatus: GameStatus;
}
