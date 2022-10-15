import { createBoard, type Board } from '..'

// Populate the board.
// Ignore the return values
function populate(board: Board) {
  while (board.next()) {
    // noop
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

test('throws if choosing from an empty board', () => {
  const board = createBoard(10)
  expect(() => board.choose(1)).toThrowError(
    'Attempted to choose a table from an empty board. Did you forget to call next()?',
  )
})

test('throws if choosing in non-increasing order', () => {
  const board = createBoard(10)

  populate(board)

  expect(() => {
    board.choose(2)
    board.choose(1)
  }).toThrow(
    'Invalid selection order. Board tables must be chosen in increasing index order',
  )
})

test('throws if choosing a non-existent table an empty board', () => {
  const board = createBoard(10)
  const outOfBoundIdx = board.length + 1

  populate(board)
  expect(() => board.choose(outOfBoundIdx)).toThrowError(
    `Index out of bounds. Attempted to choose table ${outOfBoundIdx} for a board of length ${board.length}`,
  )
})

test.each([
  [5, [3]],
  [4, [0, 2]],
  [9, [0, 4]],
  [10, [1, 4]],
])('guesses $guess if tables are chosen correctly', (guess, tables) => {
  const board = createBoard(10)

  populate(board)
  tables.forEach((i) => {
    board.choose(i)
  })

  expect(board.guess()).toBe(guess)
})
