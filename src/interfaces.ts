import { Either } from "fp-ts/Either";
import { Option } from "fp-ts/Option";

enum Marker {
  Nought,
  Cross,
}

interface Win {
  readonly marker: Marker;
}

enum Draw {
  Draw = "Draw",
}

type GameOutcome = Either<Draw, Win>;

interface FinishedGame {
  readonly outcome: GameOutcome;
  readonly board: Board;
}

type GameState = Either<OngoingGame, FinishedGame>;

type SquareAlreadyFilledError = "Square already filled.";
type PlaceMarkerOutcome = Either<SquareAlreadyFilledError, GameState>;
type Coordinate = 0 | 1 | 2;
type Coordinates = { readonly x: Coordinate; readonly y: Coordinate };

interface OngoingGame {
  readonly placeMarker: (
    coordinates: Coordinates,
    marker: Marker
  ) => PlaceMarkerOutcome;

  readonly board: Board;
}

type Square = Option<Marker>;

type ThreeLengthArray<A> = {
  readonly [0]: A;
  readonly [1]: A;
  readonly [2]: A;
  map<B>(
    f: (value: A, index: Coordinate, array: ThreeLengthArray<A>) => B
  ): ThreeLengthArray<B>;
};
type Row = ThreeLengthArray<Square>;
type Board = ThreeLengthArray<Row>;
