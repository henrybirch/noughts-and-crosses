enum Marker {
  Nought = "O",
  Cross = "X",
}

type Placement = { marker: Marker; turn: number };
type Position = Placement | null;

type Row = [Position, Position, Position];
type Grid = [Row, Row, Row];

type Square = { x: 0 | 1 | 2; y: 0 | 1 | 2 };
type Squares = Array<Square>;

enum GameStatus {
  NoughtWin = "Naught Win",
  CrossWin = "Cross Win",
  Draw = "Draw",
  Unfinished = "Unfinished",
}

export function getEmptyGrid() {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

export const Game = function (grid: Grid) {
  function getAllLines(): Array<Squares> {
    const axis: Array<0 | 1 | 2> = [0, 1, 2];

    const rows: Array<Squares> = [];
    const columns: Array<Squares> = [];

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

    const leftToRightDiagonal = axis.map((coordinate) => {
      return { x: coordinate, y: coordinate };
    });

    const rightToLeftDiagonal = axis.map((coordinate) => {
      return { x: axis[-coordinate], y: coordinate };
    });
    return [...rows, ...columns, leftToRightDiagonal, rightToLeftDiagonal];
  }

  function getNumberOfThreeConsecutiveMarkers(marker: Marker): number {
    return getAllLines().filter((line) =>
      line.every((square) => grid[square.x][square.y]?.marker === marker)
    ).length;
  }

  function areEmptySquares(): boolean {
    return !grid.every((row) => row.every((position) => position !== null));
  }

  function getStatus(): GameStatus {
    const numberOfCrossWins = getNumberOfThreeConsecutiveMarkers(Marker.Cross);
    const numberOfNoughtWins = getNumberOfThreeConsecutiveMarkers(
      Marker.Nought
    );
    if (numberOfCrossWins > 0 && numberOfNoughtWins > 0) {
      throw Error("Invalid grid: only one marker can win");
    }
    if (numberOfCrossWins > 1 || numberOfNoughtWins > 1) {
      throw Error(
        "Invalid grid: a grid ends when 3 consecutive markers are placed"
      );
    }
    if (numberOfCrossWins === 1) {
      return GameStatus.CrossWin;
    }
    if (numberOfNoughtWins === 1) {
      return GameStatus.NoughtWin;
    }
    if (areEmptySquares()) {
      return GameStatus.Unfinished;
    }
    return GameStatus.Draw;
  }

  function getMostRecentPlacement(): Placement | null {
    function isPlacement(position: Position): position is Placement {
      return position !== null;
    }

    const placements = grid.flatMap((row) => row.filter(isPlacement));
    if (placements.length === 0) {
      return null;
    }
    return placements.reduce((mostRecentPlacement, currentPlacement) =>
      mostRecentPlacement.turn < currentPlacement.turn
        ? currentPlacement
        : mostRecentPlacement
    );
  }

  function placeMarker(marker: Marker, square: Square): Grid {
    if (getStatus() !== GameStatus.Unfinished) {
      throw Error("Cannot place marker in finished grid");
    }
    const mostRecentPlacement = getMostRecentPlacement();
    if (mostRecentPlacement?.marker === marker) {
      throw Error("Cannot place same marker in a succession");
    }
    const stateOfSquare = grid[square.x][square.y];
    if (stateOfSquare !== null) {
      throw Error("Cannot place marker on another");
    }
    const thisTurn = mostRecentPlacement ? mostRecentPlacement.turn + 1 : 0;

    const newGame: Grid = [...grid];
    newGame[square.x][square.y] = { marker, turn: thisTurn };
    return newGame;
  }

  return { placeMarker, getStatus };
};
