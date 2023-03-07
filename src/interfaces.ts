import { Either } from "fp-ts/Either";
import { Option } from "fp-ts/Option";

enum Marker {
  Nought,
  Cross,
}

interface Win {
  readonly marker: Marker;
}

type Draw = "Draw";
type Outcome = Either<Draw, Win>;

interface FinishedGame {
  readonly outcome: Outcome;
  readonly gameBoard: GameBoard;
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

  readonly gameBoard: GameBoard;
}

type Square = Option<Marker>;
type Row = readonly [Square, Square, Square];
type GameBoard = readonly [Row, Row, Row];
