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
