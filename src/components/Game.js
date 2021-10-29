import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  answerInFlight,
  answeringFailed,
  answeredSuccessfully,
  currentAnswerLength,
  currentExpression,
  gameOver,
  newOngoingGame,
  updateGameOnScreen,
  newGameInFlight,
  newGameCreatedSuccessfully,
  newGameCreationFailed,
  gameFinishedSuccessfully,
  gameId,
  skipsRemaining,
} from "../reducers/Mathemagician";
import { Expression } from "./Expression";
import { GameOver } from "./GameOver";
import { RoundHistory } from "./RoundHistory";
import {useParams} from "react-router-dom";

const giveAnswer = async (dispatch, server, gameId, answer) => {
  dispatch(answerInFlight());
  try {
    const { move, game } = await server.answer(gameId, answer);
    dispatch(answeredSuccessfully({ answer, move, game }));
  } catch (error) {
    dispatch(answeringFailed(error));
  }
};

export const Game = ({ roundsPerGame, server, state , dispatch }) => {

  const { gameid } = useParams();

  useEffect( () => { 
    if (gameid != undefined && gameid != ""){
      dispatch(updateGameOnScreen(gameid)) ;
    }
  },  [gameid] );

  const [currentAnswer, setCurrentAnswer] = useState("");
  const onAnswer = async (answer) => {
    if (answer.toString().length >= currentAnswerLength(state)) {
      giveAnswer(dispatch, server, gameId(state), answer);
      setCurrentAnswer("");
    } else {
      setCurrentAnswer(answer || "");
    }
  };

  const skip = async () => giveAnswer(dispatch, server, gameId(state), "skip");
  const onNewGame = async () => {
    try {
      dispatch(newGameInFlight());
      const game = await server.createGame({ rounds: roundsPerGame });
      dispatch(newGameCreatedSuccessfully(game));
      if (state.previousGames.filter((g)=>g.id===game.id).length == 0){
        dispatch(newOngoingGame(game))  
      }
    } catch (error) {
      dispatch(newGameCreationFailed(error));
    }
  };

if (state.game == undefined ){
  return (
    <h1>game {gameid} not found</h1>
  );
}

if (gameOver(state)) {
    if (state.previousGames.filter((g)=>(g.id===state.game.id) && (g.status == "finished")).length == 0){
      dispatch(gameFinishedSuccessfully(state.game))        
    }
    
    return (
      <GameOver
        rounds={state.rounds}
        onNewGame={onNewGame}
        previousGames={state.previousGames}
        requestInFlight={state.requestInFlight}
        requestError={state.lastError}
      />
    );
  } else {
    return (
      <div className="ongoing-game">
        <RoundHistory
          previousGames={[]}
          rounds={state.rounds}
          gameFinished={false}
        />
        <Expression
          requestInFlight={state.requestInFlight}
          requestError={state.lastError}
          expression={currentExpression(state)}
          currentAnswer={currentAnswer}
          checkAnswer={onAnswer}
          skipsRemaining={skipsRemaining(state) > 0}
          skip={skip}
        />
      </div>
    );
  }
};

Game.propTypes = {
  game: PropTypes.object.isRequired,
  state:PropTypes.object.isRequired,
  dispatch:PropTypes.func.isRequired,
  roundsPerGame: PropTypes.number.isRequired,
  server: PropTypes.object.isRequired,
};
