const SERVER_ADDRESS = "http://localhost:8081";

const parse = async (fetchPromise) => {
  const response = await fetchPromise;
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error((await response.json()).error);
  }
};

const createGame = ({ rounds }) => {
  return parse(
    fetch(SERVER_ADDRESS + "/games", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ type: "mathemagician", rounds }),
    })
  );
};

const postAnswer = (gameId, guess) => {
  return parse(
    fetch(SERVER_ADDRESS + `/games/${gameId}/moves`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ guess }),
    })
  );
};

/**
 * @return {Object} Server API - {createGame, answer}
 */
export const createServer = () => {
  return {
    createGame: (params) => createGame(params),
    answer: (gameId, answer) => postAnswer(gameId, answer),
  };
};
