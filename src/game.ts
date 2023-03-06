import { Map, Range } from "immutable";
import { Coordinate, Coordinates, getCoordinates } from "./coordinates";
import { UnoccupiedSquare, Square } from "./square";

export type GameBoard = Map<Coordinates, Square>;

const FreshGameBoard: GameBoard = (() => {
  const coordinateRange: Coordinate[] = [0, 1, 2];
  const allCoordinates: Coordinates[] = coordinateRange.flatMap((y) =>
    coordinateRange.map((x) => getCoordinates({ x, y }))
  );
  const coordinatesSquares: [Coordinates, UnoccupiedSquare][] =
    allCoordinates.map((coordinates) => [coordinates, UnoccupiedSquare]);
  return Map(coordinatesSquares);
})();

export enum GameStatus {
  NoughtWin = "Nought Win",
  CrossWin = "Cross Win",
  Draw = "Draw",
  Unfinished = "Unfinished",
}

export interface Game {
  placeMarker(coordinates: Coordinates): GameBoard;

  gameStatus(): GameStatus;

  gameBoard: GameBoard;
}
