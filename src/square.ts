import { Record, RecordOf } from "immutable";
import { Marker } from "./marker";

export type Turn = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface SquareProps {
  isOccupied: Boolean;
  marker?: Marker;
  turn?: Turn;
}

interface UnoccupiedSquareProps extends SquareProps {
  isOccupied: false;
}

interface OccupiedSquareProps extends SquareProps {
  isOccupied: true;
  marker: Marker;
  turn: Turn;
}

export type Square = RecordOf<SquareProps>;
export type OccupiedSquare = RecordOf<OccupiedSquareProps> & Square;
export type UnoccupiedSquare = RecordOf<UnoccupiedSquareProps> & Square;

export const UnoccupiedSquare: UnoccupiedSquare = (function () {
  const unoccupiedSquareProps: UnoccupiedSquareProps = { isOccupied: false };
  const factory = Record(unoccupiedSquareProps);
  return factory();
})();

export const getOccupiedSquare: Record.Factory<OccupiedSquareProps> = (() => {
  const occupiedSquareProps: OccupiedSquareProps = {
    isOccupied: true,
    turn: 0,
    marker: Marker.Nought,
  };
  return Record(occupiedSquareProps);
})();
