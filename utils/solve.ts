function isValid(puzzle: any, row: any, col: any, num: any) {
  for (let c = 0; c < puzzle[row].length; c++) {
    if (c !== col && puzzle[row][c] === num) {
      return false;
    }
  }

  for (let r = 0; r < puzzle.length; r++) {
    if (r !== row && puzzle[r][col] === num) {
      return false;
    }
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (startRow + i === row && startCol + j === col) {
        continue;
      }
      if (puzzle[startRow + i]?.[startCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}

export function solvable(puzzle: any) {
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] !== 0 && !isValid(puzzle, i, j, puzzle[i][j])) {
        return false;
      }
    }
  }
  return true;
}

export function solve(puzzle: any) {
  const deepCopy = puzzle.map((row: any) => {
    return [...row];
  });

  solveRec(deepCopy);
  return deepCopy;
}

function generateRandomNums() {
  const array = Array.from(Array(10).keys());
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function solveRec(puzzle: any, row = 0, col = 0): any {
  if (col === puzzle[0].length && row === puzzle.length - 1) {
    return true;
  }

  if (col === puzzle[row].length) {
    row++;
    col = 0;
  }

  // Skip for numbers we can't change
  if (puzzle[row][col] > 0) {
    return solveRec(puzzle, row, col + 1);
  }

  const nums = generateRandomNums();

  for (let num of nums) {
    if (isValid(puzzle, row, col, num)) {
      puzzle[row][col] = num;

      if (solveRec(puzzle, row, col + 1)) {
        return true;
      }
    }
    // backtrack
    puzzle[row][col] = 0;
  }

  return false;
}
