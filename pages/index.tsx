import { Game } from 'components/game'

const Index = () => {
  const maxGuessableNumber = 100

  return (
    <div className="h-full">
      <Game maxGuessableNumber={maxGuessableNumber} />
    </div>
  )
}

export default Index
