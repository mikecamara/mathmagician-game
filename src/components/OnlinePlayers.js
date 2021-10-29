import PropTypes from "prop-types";
import { OnlinePlayer } from "./OnlinePlayer";

export const OnlinePlayers = ({ players }) => (
  <ul className="online-players">
    {players.map(({ name, id }) => (
      <li key={id}>
        <OnlinePlayer name={name} id={id} />
      </li>
    ))}
  </ul>
);

OnlinePlayers.propTypes = {
  players: PropTypes.array.isRequired,
};
