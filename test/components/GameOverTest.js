import { render } from "@testing-library/react";
import Sinon from "sinon";
import { GameOver } from "../../src/components/GameOver";
import { somePreviousGames, someRounds } from "../Fixtures";

describe("GameOver", () => {
  it("renders", () => {
    render(
      <GameOver
        rounds={someRounds}
        previousGames={somePreviousGames}
        onNewGame={Sinon.stub()}
        requestInFlight={false}
      />
    );
  });
});
