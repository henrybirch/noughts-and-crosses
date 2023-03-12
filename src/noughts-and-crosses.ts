export type Coordinate = 0 | 1 | 2;
export type Coordinates = { readonly y: Coordinate; readonly x: Coordinate };
export type Marker = "O" | "X";
export type Square = Marker | null;

type ThreeArray<A> = readonly [A, A, A];

export type Row = ThreeArray<Square>;
export type Board = ThreeArray<Row>;

export const emptyBoard: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
