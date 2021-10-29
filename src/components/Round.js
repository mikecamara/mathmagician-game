import PropTypes from "prop-types";

const roundColorClass = (correct, timeTaken) =>
  correct ? (timeTaken <= 3000 ? "correct-fast" : "correct-slow") : "incorrect";

export const Round = ({
  expression,
  answer,
  correct,
  timeTaken,
  showRoundDuration,
}) => (
  <span className={`round-history-item ${roundColorClass(correct, timeTaken)}`}>
    {expression.lhs} {expression.operator} {expression.rhs} = {answer}{" "}
    {showRoundDuration ? `[${timeTaken}]` : ""}
  </span>
);

Round.propTypes = {
  expression: PropTypes.shape({
    lhs: PropTypes.number.isRequired,
    rhs: PropTypes.number.isRequired,
    operator: PropTypes.string.isRequired,
  }).isRequired,
  answer: PropTypes.any.isRequired,
  correct: PropTypes.bool.isRequired,
  timeTaken: PropTypes.number.isRequired,
  showRoundDuration: PropTypes.bool.isRequired,
};
