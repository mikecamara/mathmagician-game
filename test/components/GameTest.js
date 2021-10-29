import { render, screen } from "@testing-library/react";
import { Game } from "../../src/components/Game";
import { createServer } from "../FakeServer";
import { someOngoingGame } from "../Fixtures";

describe("Game", () => {
  it("renders", () => {
    render(
      <Game roundsPerGame={3} game={someOngoingGame} server={createServer()} />
    );
    screen.getByTestId("answer");
  });
});
