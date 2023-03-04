enum Marker {
  Nought = "O",
  Cross = "X",
}

type Position = Marker | null;
type Coord = { x: 0 | 1 | 2; y: 0 | 1 | 2 };

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
  const leftToRightDiagonal = [Coord.x];
  const getOutcome = () => {};
};
