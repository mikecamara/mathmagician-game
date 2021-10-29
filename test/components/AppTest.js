import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "chai";
import Sinon from "sinon";
import { App } from "../../src/components/App";
import { createServer } from "../FakeServer";

describe("App", () => {
  it("initially renders setup", () => {
    render(<App server={createServer()} />);
    screen.getByText(/Number of rounds/);
  });

  it("progresses through games", async () => {
    const server = createServer();
    const connectWebSocket = Sinon.stub();
    render(<App server={server} connectWebSocket={connectWebSocket} />);

    // Connecting
    userEvent.type(screen.getByRole("textbox"), "my-name");
    userEvent.click(screen.getByRole("button"));
    await screen.findByText(/connecting/i);

    // Assert name and make open connection
    expect(connectWebSocket).to.have.been.calledWithMatch({
      parameters: { playerName: "my-name" },
    });
    connectWebSocket.yieldTo("onOpen");
    await screen.findByText(/skip/i);

    userEvent.click(await screen.findByText(/skip/i));
    server.respondWithFailure("Service unavailable");
    userEvent.type(await screen.findByTestId("answer"), "2");
    await screen.findByText("Service unavailable", { exact: false });
    server.respondWithSuccess();
    userEvent.type(await screen.findByTestId("answer"), "2");
    userEvent.type(await screen.findByTestId("answer"), "2");
    await screen.findByText(/Game over/);

    // Game 2
    userEvent.click(screen.getByText(/new game/i));
    await screen.findByText(/skip/i);

    userEvent.click(await screen.findByText(/skip/i));
    userEvent.type(await screen.findByTestId("answer"), "2");
    userEvent.type(await screen.findByTestId("answer"), "2");
    await screen.findByText(/Game over/);

    screen.getByText(/Last game/);
    screen.getByText(/Game #1/);
  });
});
