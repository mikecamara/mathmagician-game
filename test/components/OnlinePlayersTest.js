import { render } from "@testing-library/react";
import { OnlinePlayers } from "../../src/components/OnlinePlayers";
import { somePlayers } from "../Fixtures";

describe("OnlinePlayers", () => {
  it("renders", () => {
    render(<OnlinePlayers players={somePlayers} />);
  });
});
