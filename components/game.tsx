import { type Board } from 'lib/board'
import { useCallback, useState } from 'react'
import { Card } from 'react-daisyui'
import { Button } from './button'
import { Board as Table } from './board'

export interface GameProps {
  board: Board
}

export const Game: React.FC<GameProps> = ({ board }) => {
  const [table, setTable] = useState(board.next())

  const onNoClick = useCallback(() => {
    setTable(board.next())
  }, [board])
  const onYesClick = useCallback(() => {
    board.choose()
    setTable(board.next())
  }, [board])

  return table ? (
    <>
      <Table values={table} />
      <Card className="fixed bottom-0 right-0">
        <Button type="button" intent="primary" onClick={onYesClick}>
          Yes
        </Button>
        <Button type="button" intent="primary" onClick={onNoClick}>
          No
        </Button>
      </Card>
    </>
  ) : (
    <span>Your number was {board.guess()}</span>
  )
}
