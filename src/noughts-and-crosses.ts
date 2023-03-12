export type Coordinate = 0 | 1 | 2;
export type Coordinates = { readonly y: Coordinate; readonly x: Coordinate };
export type Marker = "O" | "X";
export type Square = Marker | null;

type ThreeArray<A> = readonly [A, A, A];

function threeArrayMap<A>(
  a: ThreeArray<A>
): <B>(f: ((v: A, i: Coordinate) => B) | ((v: A) => B)) => ThreeArray<B> {
  function returnFunction<B>(
    f: ((v: A, i: Coordinate) => B) | ((v: A) => B)
  ): ThreeArray<B> {
    const g = (x: Coordinate) => f(a[x], x);
    return [g(0), g(1), g(2)];
  }

  return returnFunction;
}

export type Row = ThreeArray<Square>;
export type Board = ThreeArray<Row>;

export const emptyBoard: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
