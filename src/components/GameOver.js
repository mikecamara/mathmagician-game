import PropTypes from "prop-types";
import { RoundHistory } from "./RoundHistory";
import { NewGame } from "./NewGame";

const totalTime = (rounds) => rounds.reduce((acc, r) => acc + r.timeTaken, 0);

export const GameOver = ({
  rounds,
  onNewGame,
  previousGames,
  requestInFlight,
  requestError,
}) => {
  
  return(<>
    <div className="game-over">Game over. Time spent {totalTime(rounds)}</div>

    <NewGame
      onStart={onNewGame}
      inFlight={requestInFlight}
      error={requestError}
    />
    <div> Last game </div>
    <RoundHistory gameFinished={true} rounds={rounds} />
    {previousGames.length > 0 && <div> Previous games </div>}
    {
      <div className="previous-games">
        {previousGames.map((game) => (
          <div className="previous-game" key={game.id}>
            <div className="previous-game-index">Game #{game.id}</div>
            <RoundHistory gameFinished={true} rounds={game.rounds} />
          </div>
        ))}
      </div>
    }
  </>)};
GameOver.propTypes = {
  rounds: PropTypes.array.isRequired,
  onNewGame: PropTypes.func.isRequired,
  previousGames: PropTypes.array.isRequired,
  requestInFlight: PropTypes.bool.isRequired,
  requestError: PropTypes.string,
};
