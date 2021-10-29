import { render } from "@testing-library/react";
import { Welcome } from "../../src/components/Welcome";

describe("Welcome", () => {
  it("renders", () => {
    render(<Welcome creatorName="tester" />);
  });
});
