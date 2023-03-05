enum Marker {
  Nought = "O",
  Cross = "X",
}

type Position = Marker | null;

type Row = [Position, Position, Position];
type Game = [Row, Row, Row];

type Square = { x: 0 | 1 | 2; y: 0 | 1 | 2 };
type Squares = Array<Square>;

function getFreshGame(): Game {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

enum GameStatus {
  NoughtWin = "Naught Win",
  CrossWin = "Cross Win",
  Draw = "Draw",
  Unfinished = "Unfinished",
}

const gameLogic = function (game: Game) {
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
      line.every((square) => game[square.x][square.y] === marker)
    ).length;
  }

  function areEmptySquares(): boolean {
    return !game.every((row) =>
      row.every(
        (position) => position === Marker.Nought || position === Marker.Cross
      )
    );
  }

  function getStatus(): GameStatus {
    const numberOfCrossWins = getNumberOfThreeConsecutiveMarkers(Marker.Cross);
    const numberOfNoughtWins = getNumberOfThreeConsecutiveMarkers(
      Marker.Nought
    );
    if (numberOfCrossWins > 0 && numberOfNoughtWins > 0) {
      throw Error("Invalid game: only one marker can win");
    }
    if (numberOfCrossWins > 1 || numberOfNoughtWins > 1) {
      throw Error(
        "Invalid game: a game ends when 3 consecutive markers are placed"
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
};
