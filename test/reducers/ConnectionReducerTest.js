import { expect } from "chai";
import {
  connected,
  connecting,
  disconnected,
  getConnection,
  getDisconnectionReason,
  getOnlinePlayers,
  getPlayerName,
  init,
  isConnected,
  isConnecting,
  messageReceived,
  reducer,
} from "../../src/reducers/ConnectionReducer";

describe("ConnectionReducer", () => {
  const initialState = init();

  it("throws on incorrect usage", () => {
    expect(() => reducer({}, { type: "noSuchAction" })).to.throw();
  });

  it("is initially not connecting", () => {
    expect(isConnecting(initialState)).to.eql(false);
  });

  it("is connecting after connecting started", () => {
    const state = reducer(initialState, connecting({ playerName: "name" }));
    expect(getPlayerName(state)).to.eql("name");
    expect(isConnecting(state)).to.eql(true);
    expect(isConnected(state)).to.eql(false);
  });

  it("is connected after successfully connected", () => {
    const state = reducer(initialState, connected("connection"));
    expect(getConnection(state)).to.eql("connection");
    expect(isConnected(state)).to.eql(true);
    expect(isConnecting(state)).to.eql(false);
  });

  it("is not conneted after disconnected", () => {
    const state = reducer(initialState, disconnected("reason"));
    expect(isConnected(state)).to.eql(false);
    expect(isConnecting(state)).to.eql(false);
    expect(getDisconnectionReason(state)).to.eql("reason");
  });

  it("sets players with online-player message", () => {
    const state = reducer(
      initialState,
      messageReceived({ eventName: "online-players", payload: ["player"] })
    );
    expect(getOnlinePlayers(state)).to.deep.eql(["player"]);
  });

  it("does nothing with unknown messages", () => {
    const state = reducer(
      initialState,
      messageReceived({ eventName: "some-other-message", payload: "anything" })
    );
    expect(state).to.eql(initialState);
  });
});
