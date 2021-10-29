import { render, screen } from "@testing-library/react";
import sinon from "sinon";
import { Expression } from "../../src/components/Expression";

describe("Expression", () => {
  const expression = { lhs: 1, rhs: 1, operator: "+" };

  it("renders", () => {
    const currentAnswer = 1;
    render(
      <Expression
        expression={expression}
        requestInFlight={false}
        skip={sinon.stub()}
        currentAnswer={currentAnswer}
        checkAnswer={sinon.stub()}
        skipsRemaining={true}
      />
    );
  });

  it("renders request in flight", () => {
    const currentAnswer = 1;
    render(
      <Expression
        expression={expression}
        requestInFlight={true}
        skip={sinon.stub()}
        currentAnswer={currentAnswer}
        checkAnswer={sinon.stub()}
        skipsRemaining={true}
      />
    );
    screen.getByText("Sending answer...");
  });

  it("renders request error", () => {
    const currentAnswer = 1;
    render(
      <Expression
        expression={expression}
        requestInFlight={false}
        requestError={"Service unavailable"}
        skip={sinon.stub()}
        currentAnswer={currentAnswer}
        checkAnswer={sinon.stub()}
        skipsRemaining={true}
      />
    );
    screen.getByText("Service unavailable", { exact: false });
  });
});
