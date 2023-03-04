enum Marker {
  Nought = "O",
  Cross = "X",
}

type Position = Marker | null;
type Square = { x: 0 | 1 | 2; y: 0 | 1 | 2 };
type Line = [Square, Square, Square];

type Game = [
  [Position, Position, Position],
  [Position, Position, Position],
  [Position, Position, Position]
];

function getFreshGame(): Game {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

enum gameOutcome {
  NoughtWin,
  CrossWin,
  Draw,
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
  const allLines: Array<Line> = (function () {
    const lines: Array<Line> = [];
    const axis: Array<0 | 1 | 2> = [0, 1, 2];
    for (const coordinate of axis) {
      lines.push([
        { x: 0, y: coordinate },
        { x: 1, y: coordinate },
        { x: 2, y: coordinate },
      ]);
      lines.push([
        { x: coordinate, y: 0 },
        { x: coordinate, y: 1 },
        { x: coordinate, y: 2 },
      ]);
    }
    return lines;
  })();
  return { allLines };
};

console.log(gameLogic(getFreshGame()).allLines);
