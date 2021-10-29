import PropTypes from "prop-types";

const RequestError = ({ error }) => <div>Failed to send answer: {error}</div>;
RequestError.propTypes = { error: PropTypes.string };

const SendingAnswer = () => <div>Sending answer...</div>;

export const Expression = ({
  expression,
  currentAnswer,
  checkAnswer,
  skip,
  skipsRemaining,
  requestInFlight,
  requestError,
}) => {
  const onAnswer = (event) => {
    const answer = parseInt(event.target.value, 10);
    if (!isNaN(answer)) {
      checkAnswer(answer);
    } else {
      checkAnswer(event.target.value);
    }
  };

  return (
    <div className="expression">
      <span className="question">
        <span className="term">{expression.lhs}</span>
        <span className="operator">{expression.operator}</span>
        <span className="term">{expression.rhs}</span>
        <span className="equals"> = </span>
      </span>
      {requestInFlight ? (
        <SendingAnswer />
      ) : (
        <input
          data-testid="answer"
          className="answer"
          autoFocus={true}
          value={currentAnswer}
          onChange={onAnswer}
        />
      )}
      {requestError && <RequestError error={requestError} />}
      {!requestInFlight && skipsRemaining ? (
        <button className="skip" onClick={skip}>
          Skip
        </button>
      ) : null}
    </div>
  );
};

Expression.propTypes = {
  expression: PropTypes.shape({
    lhs: PropTypes.number.isRequired,
    rhs: PropTypes.number.isRequired,
    operator: PropTypes.string.isRequired,
  }).isRequired,
  currentAnswer: PropTypes.any,
  checkAnswer: PropTypes.func.isRequired,
  requestInFlight: PropTypes.bool.isRequired,
  requestError: PropTypes.string,
  skip: PropTypes.func.isRequired,
  skipsRemaining: PropTypes.bool.isRequired,
};
