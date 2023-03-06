type Coordinate = 0 | 1 | 2;

interface Coordinates {
  x: Coordinate;
  y: Coordinate;
}

enum Marker {
  Nought = "O",
  Cross = "X",
}

interface Square {
  isOccupied: Boolean;
}

type Turn = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface OccupiedSquare extends Square {
  marker: Marker;
  turn: Turn;
}

interface UnoccupiedSquare extends Square {}

type GameBoard = [
  [Square, Square, Square],
  [Square, Square, Square],
  [Square, Square, Square]
];

enum GameStatus {
  NoughtWin = "Nought Win",
  CrossWin = "Cross Win",
  Draw = "Draw",
  Unfinished = "Unfinished",
}

interface Game {
  gameBoard: GameBoard;
  placeMarker: (marker: Marker) => GameBoard;
  gameStatus: GameStatus;
}
