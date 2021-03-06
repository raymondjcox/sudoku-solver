import { useState } from "react";
import { solve, solvable } from "../utils/solve";
import type { NextPage } from "next";
import Head from "next/head";

const EMPTY_BOARD = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const Home: NextPage = () => {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [predefined, setPredefined] = useState(new Set());
  const [error, setError] = useState(false);
  console.log(predefined);
  return (
    <div>
      <Head>
        <title>Sudoku Solver</title>
        <meta name="description" content="Solves any sudoku puzzle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-8 px-8 h-screen flex flex-col min-h-0">
        <div className="self-center">
          <div className="mb-4 min-h-0 flex content-between justify-between">
            <div className="flex gap-2 items-center">
              <h1 className="text-sm sm:text-lg font-semibold">
                Sudoku Solver
              </h1>
              {error && (
                <div className="text-red-500 font-semibold text-sm">
                  Unable to solve!
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                className="text-sm bg-slate-200 p-2 rounded"
                onClick={() => {
                  setBoard(EMPTY_BOARD);
                  setError(false);
                  setPredefined(new Set());
                }}>
                Reset
              </button>

              <button
                className="text-sm bg-blue-200 p-2 rounded"
                onClick={() => {
                  if (solvable(board)) {
                    const newBoard = board.map((row, i) => {
                      return row.map((val, j) => {
                        if (!predefined.has(i * 9 + j)) {
                          return 0;
                        }
                        return val;
                      });
                    });
                    solve(newBoard);
                    setBoard(newBoard);
                  } else {
                    setError(true);
                  }
                }}>
                Solve
              </button>
            </div>
          </div>
          <div className="grid gap-px grid-cols-9 grid-rows-9 max-w-[calc(100vh-8rem)] max-h-[calc(100vh-8rem)]">
            {board.flat(2).map((num, index) => (
              <div
                key={index}
                className={`text-lg outline ${
                  (Math.floor(index / 9) + 1) % 3 === 0 ? "border-b-2" : ""
                } ${
                  error
                    ? "outline-red-500 text-red-500 border-red-500"
                    : "outline-slate-500 border-black"
                } 
              ${(index + 1) % 3 === 0 ? "border-r-2" : ""}
              ${index % 9 === 0 ? "border-l-2" : ""} 
${index < 9 ? "border-t-2" : ""}
                border-solid outline-1 flex justify-center items-center `}>
                <input
                  className={`${
                    !predefined.has(index) && num > 0
                      ? "text-blue-600"
                      : "text-black"
                  } w-full h-full text-center text-md sm:text-3xl aspect-square`}
                  value={num || ""}
                  onChange={(e) => {
                    setError(false);
                    setBoard((prevBoard) => {
                      const newBoard = prevBoard.map((row) => {
                        return [...row];
                      });
                      const val =
                        +e.target.value > 9
                          ? +e.target.value.split("")[e.target.value.length - 1]
                          : +e.target.value;

                      if (val > 0 && !predefined.has(index)) {
                        setPredefined((p) => {
                          const newSet = new Set(p);
                          newSet.add(index);
                          return newSet;
                        });
                      }

                      if (val === 0 && predefined.has(index)) {
                        setPredefined((p) => {
                          const newSet = new Set(p);
                          newSet.delete(index);
                          return newSet;
                        });
                      }

                      newBoard[Math.floor(index / 9)][index % 9] = val || 0;
                      return newBoard;
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
