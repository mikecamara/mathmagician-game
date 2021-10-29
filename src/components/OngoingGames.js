import PropTypes from "prop-types";
import { RoundHistory } from "./RoundHistory";
import {  Link } from "react-router-dom";

export const OngoingGames = ({
  previousGames,
  }) => {
    
return (
  <>
    {previousGames.length > 0 && <div className="other-games"> Ongoing games </div>}
    {
      <div className="previous-games">
        {previousGames.filter((g)=>(g.status==="waiting_for_move") ).map((game) => (
          <div className="previous-game" key={game.id}>
              <Link to={`/games/${game.id}`} className="link-page">
                <div className="previous-game-index">Game #{game.id}</div>
              </Link>
            <RoundHistory gameFinished={true} rounds={game.rounds} />
          </div>
        ))}
      </div>
    }
  </>)};
  
OngoingGames.propTypes = {
  previousGames: PropTypes.array.isRequired,
};
