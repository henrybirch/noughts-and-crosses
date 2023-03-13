export type Coordinate = 0 | 1 | 2;
export type Coordinates = { readonly y: Coordinate; readonly x: Coordinate };

function getCoordinates(x: Coordinate, y: Coordinate) {
  return { x, y };
}

export type Marker = "O" | "X";
export type Square = Marker | null;

type ThreeArray<A> = readonly [A, A, A];

function threeArrayMap<A>(
  a: ThreeArray<A>
): <B>(f: ((v: A, i: Coordinate) => B) | ((v: A) => B)) => ThreeArray<B> {
  function map<B>(
    f: ((v: A, i: Coordinate) => B) | ((v: A) => B)
  ): ThreeArray<B> {
    const g = (x: Coordinate) => f(a[x], x);
    return [g(0), g(1), g(2)];
  }

  return map;
}

export type Row = ThreeArray<Square>;
export type Board = ThreeArray<Row>;

export const emptyBoard: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const allLines: ThreeArray<Coordinates>[] = (() => {
  const allCoordinate: ThreeArray<Coordinate> = [0, 1, 2];
  const coordinateMap = threeArrayMap(allCoordinate);

  function getRow(y: Coordinate): ThreeArray<Coordinates> {
    return coordinateMap((x: Coordinate) => getCoordinates(x, y));
  }

  function getColumn(x: Coordinate): ThreeArray<Coordinates> {
    return coordinateMap((y: Coordinate) => getCoordinates(x, y));
  }

  const allRows = coordinateMap(getRow);
  const allColumns = coordinateMap(getColumn);

  const topLeftToBottomRightDiagonal = coordinateMap((c: Coordinate) =>
    getCoordinates(c, c)
  );
  const reversedCoordinate = [...allCoordinate].reverse();
  const topRightToBottomLeftDiagonal = coordinateMap((c, i) =>
    getCoordinates(reversedCoordinate[i], c)
  );
  return [
    ...allRows,
    ...allColumns,
    topRightToBottomLeftDiagonal,
    topLeftToBottomRightDiagonal,
  ];
})();

interface Game {
  board: Board;
  moves: Marker[];
}

type GameInProgress = Game;

enum Result {
  CrossWin = "CrossWin",
  NoughtWin = "NoughtWin",
  Draw = "Draw",
}

type FinishedGame = Game & {
  result: Result;
};

export function firstMove(c: Coordinates, m: Marker): GameInProgress {
  const newBoard = threeArrayMap(emptyBoard)((row, y) =>
    threeArrayMap(row)((square, x) => (c.x === x && c.y === y ? m : square))
  );
  return { board: newBoard, moves: [m] };
}

enum InvalidMove {
  SquareAlreadyOccupied = "SquareAlreadyOccupied",
  WrongMoveOrder = "WrongMoveOrder",
}

function getResult(b: Board): Result | null {
  function isMarkerWin(m: Marker): boolean {
    return allLines.some((line) =>
      line.every((coordinates) => b[coordinates.y][coordinates.x] === m)
    );
  }

  if (isMarkerWin("O")) {
    return Result.NoughtWin;
  }
  if (isMarkerWin("X")) {
    return Result.CrossWin;
  }
  if (b.every((row) => row.every((square) => square !== null))) {
    return Result.Draw;
  }
  return null;
}

export function move(
  g: GameInProgress,
  c: Coordinates,
  m: Marker
): FinishedGame | GameInProgress | InvalidMove {
  if (g.board[c.y][c.x] !== null) {
    return InvalidMove.SquareAlreadyOccupied;
  }
  if (g.moves[-1] === m) {
    return InvalidMove.WrongMoveOrder;
  }
  const newBoard = threeArrayMap(g.board)((row, y) =>
    threeArrayMap(row)((square, x) => (c.x == x && c.y == y ? m : square))
  );
  const result = getResult(newBoard);
  const newMoves = g.moves.concat([m]);
  return getGameState(result, newBoard, newMoves);
}

function getGameState(
  result: Result | null,
  board: Board,
  moves: Marker[]
): GameInProgress | FinishedGame {
  switch (result) {
    case null:
      return { board: board, moves: moves };
    case Result.Draw:
      return { board: board, moves: moves, result: Result.Draw };
    case Result.CrossWin:
      return { board: board, moves: moves, result: Result.CrossWin };
    case Result.NoughtWin:
      return { board: board, moves: moves, result: Result.NoughtWin };
  }
}
