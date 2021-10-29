import PropTypes from "prop-types";
import { Round } from "./Round";

export const RoundHistory = ({ rounds, gameFinished }) => (
  <div className={`round-history ${gameFinished ? "finished" : ""}`}>
    {rounds.map((round, i) => (
      <Round key={i} {...round} showRoundDuration={gameFinished} />
    ))}
  </div>
);

RoundHistory.propTypes = {
  rounds: PropTypes.array.isRequired,
  gameFinished: PropTypes.bool.isRequired,
};
