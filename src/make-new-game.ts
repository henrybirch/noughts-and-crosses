import { anUnoccupiedSquare, GameBoard } from "./interfaces";

export function makeNewGame(): GameBoard {
  return [
    [anUnoccupiedSquare, anUnoccupiedSquare, anUnoccupiedSquare],
    [anUnoccupiedSquare, anUnoccupiedSquare, anUnoccupiedSquare],
    [anUnoccupiedSquare, anUnoccupiedSquare, anUnoccupiedSquare],
  ];
}
