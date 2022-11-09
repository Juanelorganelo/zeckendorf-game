import { createBoard, type Board, type Table } from '..'

// Populate the board.
// Ignore the return values
function forEachTable(
  board: Board,
  callback: (table: Table, index: number) => void,
) {
  let table: Table | null
  let index = 0

  while ((table = board.next())) {
    callback(table, index++)
  }
}

test.each([
  [
    10,
    [
      [1, 4, 6, 9],
      [2, 7, 10],
      [3, 4],
      [5, 6, 7],
      [8, 9, 10],
    ],
  ],
  [
    15,
    [
      [1, 4, 6, 9, 12, 14],
      [2, 7, 10, 15],
      [3, 4, 11, 12],
      [5, 6, 7],
      [8, 9, 10, 11, 12],
      [13, 14, 15],
    ],
  ],
])('board tables are correctly generated (with max $max)', (max, rows) => {
  const board = createBoard(max)

  for (const row of rows) {
    const table = board.next()
    expect(table).toEqual(row)
  }
})

test.each([
  [5, [3]],
  [4, [0, 2]],
  [9, [0, 4]],
  [10, [1, 4]],
])('guesses $guess if tables are chosen correctly', (guess, tables) => {
  const board = createBoard(10)

  forEachTable(board, (_, index) => {
    if (tables.includes(index)) {
      board.choose()
    }
  })

  expect(board.guess()).toBe(guess)
})
