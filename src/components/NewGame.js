import PropTypes from "prop-types";

const RequestError = ({ error }) => <div>Failed to create game: {error}</div>;
RequestError.propTypes = { error: PropTypes.string };

export const NewGame = ({ onStart, inFlight, error }) => {
  if (inFlight) {
    return <div>Creating new game...</div>;
  } else {
    return (
      <>
        {error && <RequestError error={error} />}
        <button className="new-game" onClick={onStart}>
          New game
        </button>
      </>
    );
  }
};

NewGame.propTypes = {
  onStart: PropTypes.func.isRequired,
  inFlight: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
