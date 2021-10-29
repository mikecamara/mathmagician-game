import { render } from "@testing-library/react";
import { RoundHistory } from "../../src/components/RoundHistory";
import { someRounds } from "../Fixtures";

describe("RoundHistory", () => {
  it("renders ongoing game without rounds", () => {
    render(<RoundHistory rounds={[]} gameFinished={false} />);
  });

  it("renders finished game without rounds", () => {
    render(<RoundHistory rounds={[]} gameFinished={true} />);
  });

  it("renders ongoing game with rounds", () => {
    render(<RoundHistory rounds={someRounds} gameFinished={false} />);
  });

  it("renders finished game with rounds", () => {
    render(<RoundHistory rounds={someRounds} gameFinished={true} />);
  });
});
