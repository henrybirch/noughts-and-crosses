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

enum InvalidMove {
  SquareAlreadyOccupied = "SquareAlreadyOccupied",
  WrongMoveOrder = "WrongMoveOrder",
}

function getResult(board: Board): Result | null {
  function isMarkerWin(m: Marker): boolean {
    return allLines.some((line) =>
      line.every((coordinates) => board[coordinates.y][coordinates.x] === m)
    );
  }

  if (isMarkerWin("O")) {
    return Result.NoughtWin;
  }
  if (isMarkerWin("X")) {
    return Result.CrossWin;
  }
  if (board.every((row) => row.every((square) => square !== null))) {
    return Result.Draw;
  }
  return null;
}

function updateGameState(game: Game): GameInProgress | FinishedGame {
  switch (getResult(game.board)) {
    case null:
      return game;
    case Result.Draw:
      return { ...game, result: Result.Draw };
    case Result.CrossWin:
      return { ...game, result: Result.CrossWin };
    case Result.NoughtWin:
      return { ...game, result: Result.NoughtWin };
  }
}

type Move = { readonly marker: Marker; readonly coordinates: Coordinates };

export function doMove(
  gameInProgress: GameInProgress,
  move: Move
): FinishedGame | GameInProgress | InvalidMove {
  if (gameInProgress.board[move.coordinates.y][move.coordinates.x] !== null) {
    return InvalidMove.SquareAlreadyOccupied;
  }
  if (gameInProgress.moves[-1] === move.marker) {
    return InvalidMove.WrongMoveOrder;
  }
  const newBoard = threeArrayMap(gameInProgress.board)((row, y) =>
    threeArrayMap(row)((square, x) =>
      move.coordinates.x == x && move.coordinates.y == y ? move.marker : square
    )
  );
  return updateGameState({
    board: newBoard,
    moves: gameInProgress.moves.concat([move.marker]),
  });
}
