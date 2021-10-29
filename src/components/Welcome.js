import PropTypes from "prop-types";

export const Welcome = ({ creatorName }) => (
  <div className="welcome">
    Hi, this is&nbsp;
    <div className="game-logo">
      <span className="creator">{creatorName}</span>&apos;s math game
    </div>
    choose your parameters and get to calculating!
  </div>
);

Welcome.propTypes = { creatorName: PropTypes.string.isRequired };
