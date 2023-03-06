import { anUnoccupiedSquare, GameBoard } from "./interfaces";

export function makeNewGameBoard(): GameBoard {
  return [
    [anUnoccupiedSquare, anUnoccupiedSquare, anUnoccupiedSquare],
    [anUnoccupiedSquare, anUnoccupiedSquare, anUnoccupiedSquare],
    [anUnoccupiedSquare, anUnoccupiedSquare, anUnoccupiedSquare],
  ];
}
