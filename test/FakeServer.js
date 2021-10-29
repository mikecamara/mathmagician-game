/**
 * A fake server that just keeps an in-memory array of comments.
 * The server can be modified to start responding with failure.
 *
 * @return {Object} Server API - {createGame, answer} and
 *   additionally, {fake: true, respondWithSuccess, respondWithFailure}.
 */
export const createServer = () => {
  let lastId = 0;

  let errorOnActions = null;
  const maybeError = (successReturnValue) =>
    errorOnActions
      ? Promise.reject(errorOnActions)
      : Promise.resolve(successReturnValue);

  const onePlusOne = {
    rhs: 1,
    lhs: 1,
    operator: "+",
    correctAnswerLength: "1",
  };

  let currentGame;

  const giveAnswer = (_gameId, answer) => {
    if (errorOnActions) {
      return Promise.reject(errorOnActions);
    }
    currentGame = { ...currentGame, roundsLeft: currentGame.roundsLeft - 1 };
    const game = {
      ...currentGame,
      nextExpression: onePlusOne,
      status: currentGame.roundsLeft > 0 ? "waiting_for_move" : "finished",
    };
    if (answer === "skip") {
      currentGame = {
        ...currentGame,
        skipsRemaining: currentGame.skipsRemaining - 1,
      };
    }
    const move =
      answer === "skip"
        ? { timeSpentMillis: 500, correct: false, skipped: true }
        : { timeSpentMillis: 500, correct: true, skipped: false };
    return Promise.resolve({ move, game });
  };

  const createGame = ({ rounds }) => {
    lastId++;

    currentGame = {
      id: lastId.toString(),
      roundsLeft: rounds,
      status: "waiting_for_move",
      skipsRemaining: Math.floor(rounds / 3),
      nextExpression: onePlusOne,
    };
    return maybeError(currentGame);
  };

  /*
   * Simple functions to control server behaviour for tests
   */
  const respondWithSuccess = () => {
    errorOnActions = null;
  };
  const respondWithFailure = (errorMessage) => {
    errorOnActions = new Error(errorMessage);
  };

  return {
    answer: giveAnswer,
    createGame,
    fake: true,
    respondWithSuccess,
    respondWithFailure,
  };
};
