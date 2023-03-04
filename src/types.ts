export enum Marker {
  Nought = "O",
  Cross = "X",
}

export type Position = Marker | null;
export type Coord = { x: 0 | 1 | 2; y: 0 | 1 | 2 };

export type Game = [
  [Position, Position, Position],
  [Position, Position, Position],
  [Position, Position, Position]
];

export enum gameOutcome {
  NoughtWin,
  CrossWin,
  Draw,
}
