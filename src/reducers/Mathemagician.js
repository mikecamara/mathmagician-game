// Actions
export const answerInFlight = () => ({
  type: "answerInFlight",
});

export const answeredSuccessfully = ({ answer, move, game }) => ({
  type: "answerSuccess",
  payload: { answer, move, game },
});

export const answeringFailed = (error) => ({
  type: "answerFailure",
  payload: error,
});

export const newGameInFlight = () => ({
  type: "newGameInFlight",
});

export const newGameCreatedSuccessfully = (game) => ({
  type: "newGameSuccess",
  payload: game,
});

export const gameStartedSuccessfully = (game) => ({
  type: "newGameStartedSuccess",
  payload: game,
});

export const gameFinishedSuccessfully = (oldGame) => ({
  type: "newGameOverSuccess",
  payload: oldGame,
});

export const updateGameOnScreen = (gameid) => ({
  type: "updateGameOnScreen",
  payload: gameid,
});

export const newOngoingGame = (oldGame) => ({
  type: "newOngoingGame",
  payload: oldGame,
});

export const newGameCreationFailed = (error) => ({
  type: "newGameFailure",
  payload: error,
});

// Reducer init
export const init = ({ game }) => {
  return {
    game,
    previousGames: [],
    rounds: [],
    lastError: null,
    requestInFlight: false,
  };
};

// Selector functions
export const currentExpression = (state) => state.game.nextExpression;

export const currentAnswerLength = (state) =>
  currentExpression(state).correctAnswerLength;

export const gameOver = (state) => state.game.status !== "waiting_for_move";

export const gameId = (state) => state.game.id;

export const skipsRemaining = (state) => state.game.skipsRemaining;

// Reducer logic
const answerSuccess = (state, { answer, move, game }) => {
  const round = {
    timeTaken: move.timeSpentMillis,
    expression: state.game.nextExpression,
    answer: answer,
    correct: move.correct,
    skipped: move.skipped,
  };

  return {
    ...state,
    lastError: null,
    requestInFlight: false,
    game,
    rounds: state.rounds.concat(round),
  };
};

const moveToNextGame = (state, game) => {
  return {
    ...state,
    lastError: null,
    requestInFlight: false,
    game,
    rounds: [],
  };
};

 const startFreshGame = (state, game) => {
  return {
    ...state,
    game,
  };
};

const updateOngoingGames = (state, oldGame) => {
  return {
    ...state,
    previousGames: state.previousGames.concat({
      ...oldGame, 
      rounds: state.rounds,
    }),
  };
};

const updateGameOnScreenFunction = (state, gameid) => {
  return {
    ...state,
   game:state.previousGames.find((game)=>game.id == gameid),
  };
};

 const updatePreviousGames = (state, oldGame) => {
  return {
    ...state,
    previousGames: state.previousGames.map((game)=>{ 
      if (game.id == oldGame.id){
        return ({
          ...game,
          status: oldGame.status,
        });
      } else {
        return game;
      }
    }),
    game: oldGame,
    rounds: [],
  };
};


export const reducer = (state, action) => {
  switch (action.type) {
    case "answerInFlight":
    case "newGameInFlight":
      return { ...state, requestInFlight: true };
    case "answerSuccess":
      return answerSuccess(state, action.payload);
    case "newGameSuccess":
      return moveToNextGame(state, action.payload);
    case "newGameOverSuccess":
      return updatePreviousGames(state,  action.payload);
    case "updateGameOnScreen":
        return updateGameOnScreenFunction(state,  action.payload);
    case "newOngoingGame":
      return updateOngoingGames(state,  action.payload);
    case "newGameStartedSuccess":
      return startFreshGame(state,  action.payload);
    case "answerFailure":
    case "newGameFailure":
      return {
        ...state,
        lastError: action.payload.message,
        requestInFlight: false,
      };
    default:
      throw new Error("Bad Mathemagician reducer usage");
  }
};
