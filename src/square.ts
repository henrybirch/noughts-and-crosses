import { Record } from "immutable";
import { Marker } from "./marker";

export interface SquareProps {
  isOccupied: Boolean;
}

export interface UnoccupiedSquareProps {
  isOccupied: false;
}

export interface OccupiedSquareProps {
  isOccupied: true;
  marker: Marker;
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
  };
  return Record(anOccupiedSquareProps);
})();
