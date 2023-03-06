import { anUnoccupiedSquare, GameBoard } from "./interfaces";

function makeNewGame(): GameBoard {
  return [
    [anUnoccupiedSquare, anUnoccupiedSquare, anUnoccupiedSquare],
    [anUnoccupiedSquare, anUnoccupiedSquare, anUnoccupiedSquare],
    [anUnoccupiedSquare, anUnoccupiedSquare, anUnoccupiedSquare],
  ];
}
