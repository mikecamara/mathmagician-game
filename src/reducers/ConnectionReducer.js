export const init = () => ({
  connected: false,
  connecting: false,
  connection: null,
  playerName: null,
  disconnectionReason: null,
  onlinePlayers: [],
});

export const connected = (connection) => ({
  type: "connected",
  payload: connection,
});

export const connecting = ({ playerName }) => ({
  type: "connecting",
  payload: playerName,
});

export const disconnected = (reason) => ({
  type: "disconnected",
  payload: reason,
});

export const messageReceived = (message) => ({
  type: "messageReceived",
  payload: message,
});

const processMessage = (state, message) => {
  if (message.eventName === "online-players") {
    return { ...state, onlinePlayers: message.payload };
  } else {
    return state;
  }
};

export const getConnection = (state) => state.connection;
export const isConnecting = (state) => state.connecting;
export const isConnected = (state) => state.connected;
export const getDisconnectionReason = (state) => state.disconnectionReason;
export const getOnlinePlayers = (state) => state.onlinePlayers;
export const getPlayerName = (state) => state.playerName;

export const reducer = (state, action) => {
  switch (action.type) {
    case "connecting":
      return {
        ...state,
        connecting: true,
        disconnectionReason: null,
        playerName: action.payload,
      };
    case "connected":
      return {
        ...state,
        connected: true,
        connecting: false,
        connection: action.payload,
      };
    case "disconnected":
      return {
        ...state,
        connected: false,
        connecting: false,
        disconnectionReason: action.payload,
        onlinePlayers: [],
      };
    case "messageReceived":
      return processMessage(state, action.payload);
    default:
      throw new Error("Bad Mathemagician reducer usage");
  }
};
