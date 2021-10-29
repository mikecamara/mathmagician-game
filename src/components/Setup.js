import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";

export const Setup = ({ onStart }) => {
  const [rounds, setRounds] = useState(3);
  const [name, setName] = useState("");

  const maybeStart = () => {
    if (rounds > 0 && rounds <= 20) {
      onStart({ rounds: rounds, name: name });
    }
  };
  const roundInput = useRef();

  /*
   * `useEffect` triggers whenever a value in the dependency list (second
   * argument) changes. When there are no values in the dependency list,
   * `useEffect` only triggers when the component is mounted (first rendered).
   */
  useEffect(() => roundInput.current.focus(), []);

  return (  
    <div className="setup">
      
      <div className="rounds">
        Number of rounds:
        <input
          ref={roundInput}
          type="number"
          min={1}
          max={20}
          value={rounds}
          onChange={(ev) =>
            setRounds(ev.target.value && parseInt(ev.target.value, 10))
          }
        />
      </div>
      <div className="name">
        Your name:
        <input
          type="text"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
      </div>
      <div>
        <button className="start" onClick={maybeStart}>
          START
        </button>
      </div>
    </div>
  );
};

Setup.propTypes = { onStart: PropTypes.func.isRequired };
