export const onePlusOne = {
  lhs: 1,
  rhs: 1,
  operator: "+",
  correctAnswerLength: 1,
};

export const someRounds = [
  {
    expression: { lhs: 1, rhs: 1, operator: "*" },
    answer: 1,
    correct: true,
    timeTaken: 100,
  },
  {
    expression: { lhs: 1, rhs: 1, operator: "-" },
    answer: 0,
    correct: false,
    timeTaken: 200,
  },
];

export const somePreviousGames = [
  { id: 1, rounds: someRounds },
  { id: 2, rounds: someRounds },
];

export const someOngoingGame = {
  id: "1",
  status: "waiting_for_move",
  nextExpression: onePlusOne,
  skipsRemaining: 1,
};

export const somePlayers = [
  { id: "player-1-id", name: "player-1-name" },
  { id: "player-2-id", name: "player-2-name" },
];
