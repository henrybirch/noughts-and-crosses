enum Marker {
  Nought = "O",
  Cross = "X",
}

type Position = Marker | null;
type Coordinates = { x: 0 | 1 | 2; y: 0 | 1 | 2 };
type Line = [Coordinates, Coordinates, Coordinates];

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

const game = (game: Game) => {
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
  const allLines = () => {};
};
