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

type Square = { x: 0 | 1 | 2; y: 0 | 1 | 2 };
type Line = [Square, Square, Square];

function getFreshGame(): Game {
    return [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
}

enum GameStatus {
    NoughtWin,
    CrossWin,
    Draw,
    Unfinished,
}

const gameLogic = function (game: Game) {
    function getAllLines() {
        const axis: Array<0 | 1 | 2> = [0, 1, 2];

        const rows: Array<Line> = [];
        const columns: Array<Line> = [];

        for (const coordinate of axis) {
            rows.push([
                {x: 0, y: coordinate},
                {x: 1, y: coordinate},
                {x: 2, y: coordinate},
            ]);
            columns.push([
                {x: coordinate, y: 0},
                {x: coordinate, y: 1},
                {x: coordinate, y: 2},
            ]);
        }

        const leftToRightDiagonal = axis.map(coordinate => {
            return {x: coordinate, y: coordinate}
        })

        const rightToLeftDiagonal = axis.map(coordinate => {
            return {x: -coordinate, y: coordinate}
        })
        return [...rows, ...columns, leftToRightDiagonal, rightToLeftDiagonal];
    }

    function getNumberOfThreeConsecutiveMarkers(marker: Marker) {
        return getAllLines().filter((line) =>
            line.every((square) => game[square.x][square.y] === marker)
        ).length;
    }

    function get

    function getStatus(): GameStatus {
        const numberOfCrossWins = getNumberOfThreeConsecutiveMarkers(Marker.Cross);
        const numberOfNaughtWins = getNumberOfThreeConsecutiveMarkers(
            Marker.Nought
        );
        if (numberOfCrossWins > 0 && numberOfNaughtWins > 0) {
            throw Error("Invalid game: only one marker can win");
        }
    }
};
console.log(gameLogic(getFreshGame()).allLines);
