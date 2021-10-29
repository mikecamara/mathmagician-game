import { useReducer, useState } from "react";
import PropTypes from "prop-types";
import { Game } from "./Game";
import { Setup } from "./Setup";
import { connect } from "../WebSocket";
import { OnlinePlayers } from "./OnlinePlayers";
import { Route, Link, Switch, useHistory } from "react-router-dom";
import { Welcome } from "./Welcome";
import { FinishedGames } from "./FinishedGames";
import { OngoingGames } from "./OngoingGames";

import {
  init as mathInit,
  reducer as mathReducer,
  gameStartedSuccessfully,
  newOngoingGame,
} from "../reducers/Mathemagician";

import {
  connected,
  connecting,
  disconnected,
  getConnection,
  getOnlinePlayers,
  init,
  messageReceived,
  reducer,
  getDisconnectionReason,
} from "../reducers/ConnectionReducer";

const FailedToCreateGame = ({ error }) => (
  <div>Failed to create game: {error}. Please try again</div>
);
FailedToCreateGame.propTypes = { error: PropTypes.string };

const FailedToConnect = ({ reason }) => (
  <div>Failed to connect: {reason}. Please try again</div>
);
FailedToConnect.propTypes = { reason: PropTypes.string };

const CreatingGame = () => <div>Creating game ...</div>;

const connectAndManageWebsocket = (dispatch, connectWebSocket, playerName) => {
  const connection = connectWebSocket({
    parameters: { playerName },
    onOpen: () => dispatch(connected(connection)),
    onClose: ({ reason }) => dispatch(disconnected(reason)),
    onMessage: (message) => dispatch(messageReceived(message)),
  });
  dispatch(connecting(playerName));
};

export const App = ({ server, connectWebSocket }) => {

  const [{ game, roundsPerGame, error, createInFlight }, setGame] = useState({
    createInFlight: false,
  });

  const history = useHistory();      

  const [mathState, mathDispatch] = useReducer(mathReducer, {game}, mathInit);

  const [connectionState, dispatch] = useReducer(reducer, {}, init);

  const disconnect = () => {
    getConnection(connectionState).close();
  };

  const onlinePlayers = getOnlinePlayers(connectionState);
  const disconnectionReason = getDisconnectionReason(connectionState);


  const onStart = async ({ rounds, name }) => {
    try {
      setGame({ createInFlight: true });
      const game = await server.createGame({ rounds });
      mathDispatch(gameStartedSuccessfully(game))
      setGame({ game, roundsPerGame: rounds });
      if (mathState.previousGames.filter((g)=>g.id===game.id).length == 0){
        mathDispatch(newOngoingGame(game))  
      }
      connectAndManageWebsocket(dispatch, connectWebSocket, name);
      history.push("/games/"+ game.id);
    } catch (error) {
      setGame({ error: error.message || error });
    }
  };

  if (game && connectionState.connecting) {
    return <div>Connecting...</div>;
  } else if (game && game.status == "waiting_for_move" && connectionState.connected) {
      
    return (
      <>
          <div>
            <Link to="/" className="link-page">Home</Link>
            <Link to="/createGame" className="link-page">Create Game</Link>
            <Link to="/players" className="link-page">Players</Link>
            <Link to="/ongoingGames" className="link-page">Ongoing Games</Link>
            <Link to="/finishedGames" className="link-page">Finished Games</Link>
          </div> 

          <Switch>
              <Route exact path="/">
                <button className="btn-disconnect" onClick={disconnect}>Disconnect</button>
                <Game roundsPerGame={roundsPerGame} server={server} state={mathState} dispatch={mathDispatch}/>
              </Route>
              <Route exact path='/games/:gameid'>
                <button className="btn-disconnect" onClick={disconnect}>Disconnect</button>
                <Game roundsPerGame={roundsPerGame} state={mathState} dispatch={mathDispatch} server={server} />
              </Route>
              <Route path="/createGame">
                <Setup onStart={onStart} />
                      {error ? <FailedToCreateGame error={error} /> : null}
                      {disconnectionReason ? (
                        <FailedToConnect reason={disconnectionReason} />
                      ) : null}
                </Route>
                <Route path="/players">
                <button className="btn-disconnect" onClick={disconnect}>Disconnect</button>
                <OnlinePlayers players={onlinePlayers} />  
              </Route>
              <Route exact path="/ongoingGames">
                <OngoingGames history={history} previousGames={mathState.previousGames} />
              </Route>
              <Route exact path="/finishedGames">
                <FinishedGames previousGames={mathState.previousGames} />
              </Route>
              <Route >
                <NotFound />
              </Route>
          </Switch>
      </>
    );
  } else if (createInFlight) {
    return <CreatingGame />;
  } else {
    return (
      <>
        <Switch>
          <Route exact path="/">
            <Welcome creatorName={"Mike"}/>
            <Link className="link-welcome" to="/createGame">Create Game</Link>
          </Route>
          <Route path="/createGame">
              <Link className="link-page" to="/">Home</Link>
              <Setup onStart={onStart} />
                {error ? <FailedToCreateGame error={error} /> : null}
                {disconnectionReason ? (
                  <FailedToConnect reason={disconnectionReason} />
                ) : null}
          </Route>
          <Route >
                <NotFound />
            </Route>
      </Switch>
      </>
    );
  }
};

const NotFound = ()=> {
  return (<h1>Game not found</h1>);
}


App.propTypes = { generateExpression: PropTypes.func };
App.defaultProps = { connectWebSocket: connect };
