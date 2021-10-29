import { render, screen } from "@testing-library/react";
import Sinon from "sinon";
import { NewGame } from "../../src/components/NewGame";

describe("NewGame", () => {
  it("renders", () => {
    render(<NewGame onStart={Sinon.stub()} inFlight={false} />);
  });

  it("renders new game creation in flight", () => {
    render(<NewGame onStart={Sinon.stub()} inFlight={true} />);
    screen.findByText("Creating new game...");
  });

  it("renders new game creation error", () => {
    render(
      <NewGame
        onStart={Sinon.stub()}
        inFlight={false}
        error={"Service unavailable"}
      />
    );
    screen.findByText("Service unavailable");
  });
});
