enum Marker {
  Nought = "O",
  Cross = "X",
}

type Position = Marker | null;

type Game = [
  [Position, Position, Position],
  [Position, Position, Position],
  [Position, Position, Position]
];

type Square = { x: 0 | 1 | 2; y: 0 | 1 | 2 };
type Line = [Square, Square, Square];

function getFreshGame(): Game {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

enum GameStatus {
  NoughtWin,
  CrossWin,
  Draw,
  Unfinished,
}

const gameLogic = function (game: Game) {
  const leftToRightDiagonal: Line = [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ];
  const rightToLeftDiagonal: Line = [
    { x: 2, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 2 },
  ];

  function getAllLines() {
    const axis: Array<0 | 1 | 2> = [0, 1, 2];

    const rows: Array<Line> = [];
    const columns: Array<Line> = [];

    for (const coordinate of axis) {
      rows.push([
        { x: 0, y: coordinate },
        { x: 1, y: coordinate },
        { x: 2, y: coordinate },
      ]);
      columns.push([
        { x: coordinate, y: 0 },
        { x: coordinate, y: 1 },
        { x: coordinate, y: 2 },
      ]);
    }
    return [...rows, ...columns, leftToRightDiagonal, rightToLeftDiagonal];
  })();
  return { allLines };
};
console.log(gameLogic(getFreshGame()).allLines);
