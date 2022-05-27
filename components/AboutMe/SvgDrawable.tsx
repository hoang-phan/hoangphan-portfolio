import React, { useRef, useState, useEffect, createRef } from 'react';
import styled, {keyframes, css} from 'styled-components';

interface ISvgDrawableProps {
  position?: number;
  paths?: string[];
  animationDelay?: number;
  size?: number;
}

interface IPathProps {
  ref: any;
  index: number;
  strokeLength: any;
}

const SvgDrawable: React.FC<ISvgDrawableProps> = ({position, paths, animationDelay, size}) => {
  const pathLength = paths.length;
  const refs = useRef(paths.map(createRef));
  const [strokeLengths, setStrokeLengths] = useState([]);

  const Path = styled.path<IPathProps>`
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

  const getLength = (el) => el.getTotalLength();

  useEffect(() => {
    setStrokeLengths(
      refs.current.map(ref => getLength(ref.current))
    );
  }, []);

  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      {paths.map((path, index) => (
        <Path
          ref={refs.current[index]}
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
