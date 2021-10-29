import { expect } from "chai";
import {
  answeredSuccessfully,
  answerInFlight,
  answeringFailed,
  currentAnswerLength,
  currentExpression,
  gameOver,
  init,
  newGameCreatedSuccessfully,
  newGameCreationFailed,
  newGameInFlight,
  reducer,
} from "../../src/reducers/Mathemagician";
import { onePlusOne, someOngoingGame } from "../Fixtures";

describe("Mathemagician", () => {
  it("throws on incorrect usage", () => {
    expect(() => reducer({}, { type: "noSuchAction" })).to.throw();
  });

  it("has initial state with game initially", () => {
    const state = init({ game: someOngoingGame });
    expect(gameOver(state)).to.eql(false);
    expect(currentExpression(state)).to.include({
      lhs: 1,
      rhs: 1,
      operator: "+",
    });
    expect(currentAnswerLength(state)).to.eql(1);
  });

  const stateWithOngoingGame = init({ game: someOngoingGame });

  it("handles answers in flight", () => {
    expect(reducer(stateWithOngoingGame, answerInFlight())).to.include({
      requestInFlight: true,
    });
  });

  it("handles answer failure", () => {
    expect(
      reducer(stateWithOngoingGame, answeringFailed(new Error("bad answer")))
    ).to.include({
      lastError: "bad answer",
    });
  });

  it("handles new game creation in flight", () => {
    expect(reducer(stateWithOngoingGame, newGameInFlight())).to.include({
      requestInFlight: true,
    });
  });

  it("handles new game creaiton failure", () => {
    expect(
      reducer(
        stateWithOngoingGame,
        newGameCreationFailed(new Error("Service unavailable"))
      )
    ).to.include({
      lastError: "Service unavailable",
    });
  });

  it("stores successful answer in rounds", () => {
    expect(
      reducer(
        stateWithOngoingGame,
        answeredSuccessfully({
          answer: "2",
          move: { timeSpentMillis: 100, correct: true, skipped: false },
          game: { nextExpression: onePlusOne },
        })
      )
    ).to.deep.include({
      rounds: [
        {
          timeTaken: 100,
          expression: onePlusOne,
          answer: "2",
          correct: true,
          skipped: false,
        },
      ],
    });
  });

  it("stores games in previous game when new game created", () => {
    expect(
      reducer(stateWithOngoingGame, newGameCreatedSuccessfully(someOngoingGame))
    ).to.deep.include({
      previousGames: [{ id: "1", rounds: [] }],
    });
  });
});
