import { Record } from "immutable";

export type Coordinate = 0 | 1 | 2;
export type CoordinatesProps = { x: Coordinate; y: Coordinate };
export const Coordinates: Record.Factory<CoordinatesProps> = (function () {
  const someCoordinatesProps: CoordinatesProps = { x: 0, y: 0 };
  return Record(someCoordinatesProps);
})();
