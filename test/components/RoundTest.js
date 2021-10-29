import { render } from "@testing-library/react";
import { Round } from "../../src/components/Round";

describe("Round", () => {
  const round = {
    expression: { lhs: 1, rhs: 1, operator: "*" },
    answer: 1,
    correct: true,
    timeTaken: 100,
  };

  it("renders", () => {
    render(<Round {...round} showRoundDuration={true} />);
  });
});
