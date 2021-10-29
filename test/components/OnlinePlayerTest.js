import { render } from "@testing-library/react";
import { OnlinePlayer } from "../../src/components/OnlinePlayer";
import { somePlayers } from "../Fixtures";

describe("OnlinePlayer", () => {
  it("renders", () => {
    render(<OnlinePlayer {...somePlayers[0]} />);
  });
});
