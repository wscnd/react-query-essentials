import React, { useState } from "react";

const ToggleView: React.FunctionComponent = ({ children }) => {
  const [show, toggle] = useState(true);
  return (
    <>
      <button onClick={() => toggle((previous) => !previous)}>show</button>
      {show ? children : null}
    </>
  );
};
export { ToggleView };
