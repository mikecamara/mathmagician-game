import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "chai";
import sinon from "sinon";
import { Setup } from "../../src/components/Setup";

describe("Setup", () => {
  it("renders", () => {
    render(<Setup onStart={sinon.stub()} />);
  });

  it("calls onStart with set rounds", () => {
    const onStart = sinon.stub();
    render(<Setup onStart={onStart} />);
    const roundInput = screen.getByRole("spinbutton");
    userEvent.clear(roundInput);
    userEvent.type(roundInput, "1");
    const nameInput = screen.getByRole("textbox");
    userEvent.type(nameInput, "my-name");
    userEvent.click(screen.getByRole("button"));

    expect(onStart).to.have.been.calledWith({ rounds: 1, name: "my-name" });
  });
});
