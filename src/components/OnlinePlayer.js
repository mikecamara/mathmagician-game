import PropTypes from "prop-types";

export const OnlinePlayer = ({ id, name }) => (
  <div className="online-player" data-player-id={id}>
    {name}
  </div>
);

OnlinePlayer.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
