export enum Marker {
  Nought = "O",
  Cross = "X",
}

export type Position = Marker | null;

export type Game = [
  [Position, Position, Position],
  [Position, Position, Position],
  [Position, Position, Position]
];
