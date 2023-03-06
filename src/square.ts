import { Record } from "immutable";
import { Marker } from "./marker";

export interface SquareProps {
  isOccupied: Boolean;
}

export interface UnoccupiedSquareProps {
  isOccupied: false;
}

export type Turn = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface OccupiedSquareProps {
  isOccupied: true;
  marker: Marker;
  turn: Turn;
}

export const UnoccupiedSquare: Record<UnoccupiedSquareProps> = (() => {
  const anUnoccupiedSquare: UnoccupiedSquareProps = { isOccupied: false };
  const unoccupiedSquareFactory = Record(anUnoccupiedSquare);
  return unoccupiedSquareFactory();
})();

export const OccupiedSquare: Record.Factory<OccupiedSquareProps> = (() => {
  const anOccupiedSquareProps: OccupiedSquareProps = {
    isOccupied: true,
    marker: Marker.Nought,
    turn: 0,
  };
  return Record(anOccupiedSquareProps);
})();
