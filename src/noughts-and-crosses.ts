import { Either, left, right } from "fp-ts/Either";

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

const emptyBoard: Board = [
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

export type Game = {
  board: Board;
  moves: Marker[];
};

export enum Result {
  CrossWin = "CrossWin",
  NoughtWin = "NoughtWin",
  Draw = "Draw",
}

export type FinishedGame = Game & {
  result: Result;
};

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

function updateGameState(game: Game): Either<Game, FinishedGame> {
  switch (getResult(game.board)) {
    case null:
      return left(game);
    case Result.Draw:
      return right({ ...game, result: Result.Draw });
    case Result.CrossWin:
      return right({ ...game, result: Result.CrossWin });
    case Result.NoughtWin:
      return right({ ...game, result: Result.NoughtWin });
  }
}

export type Move = {
  readonly marker: Marker;
  readonly coordinates: Coordinates;
};

export function getNewGame(): Game {
  return { board: emptyBoard, moves: [] };
}

export enum InvalidMove {
  SquareAlreadyOccupied = "SquareAlreadyOccupied",
  WrongMoveOrder = "WrongMoveOrder",
}
export function doMove(
  game: Game,
  move: Move
): Either<InvalidMove, Either<Game, FinishedGame>> {
  if (game.board[move.coordinates.y][move.coordinates.x] !== null) {
    return left(InvalidMove.SquareAlreadyOccupied);
  }
  if (game.moves[-1] === move.marker) {
    return left(InvalidMove.WrongMoveOrder);
  }
  const newBoard = threeArrayMap(game.board)((row, y) =>
    threeArrayMap(row)((square, x) =>
      move.coordinates.x == x && move.coordinates.y == y ? move.marker : square
    )
  );
  return right(
    updateGameState({
      board: newBoard,
      moves: game.moves.concat([move.marker]),
    })
  );
}
