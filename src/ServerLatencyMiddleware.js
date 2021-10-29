export const ServerLatencyMiddleware = () => {
  // Initialization code if any goes here

  let lastRequestStartTime;
  return (next) => {
    return (action) => {
      switch (action.type) {
        case "answerInFlight":
        case "newGameInFlight": {
          lastRequestStartTime = Date.now();
          break;
        }
        case "answerSuccess":
        case "newGameSuccess":
        case "answerFailure":
        case "newGameFailure": {
          const latency = Date.now() - lastRequestStartTime;

          // eslint-disable-next-line no-console
          console.log("Server latency is", latency, "milliseconds");
          break;
        }
      }

      next(action);
    };
  };
};
