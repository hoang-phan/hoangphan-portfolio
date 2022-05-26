import React, { useRef, useState, useEffect } from 'react';
import styled, {keyframes, css} from 'styled-components';

const SvgDrawable: React.FC = ({position, paths, animationDelay, size}) => {
  const pathLength = paths.length;
  const refs = paths.map(path => useRef(null));
  const [strokeLengths, setStrokeLengths] = useState([]);
  const Path = styled.path`
    @keyframes draw-${position}-${props => props.index} {
      0% { stroke-dashoffset: ${props => props.strokeLength}px; opacity: 0 }
      100% { stroke-dashoffset: 0; opacity: 1 }
    }

    animation: draw-${position}-${props => props.index} ${3 / pathLength}s linear forwards;
    animation-delay: ${props => animationDelay + props.index * 3 / pathLength}s;
    stroke-dasharray: ${props => props.strokeLength}px;
    stroke-dashoffset: ${props => props.strokeLength}px;
    opacity: 0;
  `;

  useEffect(() => {
    setStrokeLengths(refs.map(ref => ref.current.getTotalLength()));
  }, []);

  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      {paths.map((path, index) => (
        <Path ref={refs[index]}
          key={index}
          index={index}
          stroke="#fff"
          strokeWidth={4}
          strokeLength={strokeLengths[index]}
          fill="none"
          d={path}
        />
      ))}
    </svg>
  )
}

export default SvgDrawable
