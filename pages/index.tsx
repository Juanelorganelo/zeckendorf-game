import { Game } from 'components/game'
import { createBoard } from 'lib/board'

const Index = () => {
  const board = createBoard(50)

  return (
    <div className="h-full">
      <Game board={board} />
    </div>
  )
}

export default Index
