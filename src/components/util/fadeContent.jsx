import React from "react";
import Transition from 'react-transition-group/Transition';


const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};

const Fade = ({inProp, duration, children}) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <span style={{
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
        ...transitionStyles[state]
      }}>
        {children}
      </span>
    )}
  </Transition>
);

export default Fade;