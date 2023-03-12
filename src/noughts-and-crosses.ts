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

function getCoordinates(x: Coordinate, y: Coordinate) {
  return { x, y };
}

const allLines: ThreeArray<Coordinates>[] = (() => {
  const allCoordinate: ThreeArray<Coordinate> = [0, 1, 2];
  const coordinateMap = threeArrayMap(allCoordinate);

  function getRow(y: Coordinate): ThreeArray<Coordinates> {
    return coordinateMap((x: Coordinate) => getCoordinates(x, y));
  }

  function getColumn(x: Coordinate): ThreeArray<Coordinates> {
    return coordinateMap((y: Coordinate) => getCoordinates(x, y));
  }

  const allRows = allCoordinate.map(getRow);
  const allColumns = allCoordinate.map(getColumn);

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
