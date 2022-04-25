import React from 'react';
import styled from 'styled-components';
const CurvedText = styled.div`
  margin-bottom: ${props => props.marginBottom};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  path {
    fill: transparent;
  }
  text {
    fill: currentColor;
    text-anchor: middle;
  }
`;

export default ({ text, objectSize = 120, spacing = 12, offset = 30, overlap = false }) => {
  const d = objectSize + spacing * 2;
  const r = objectSize / 2 + spacing / 2;

  return (
    <CurvedText
        className="curved-text"
        marginBottom={overlap ? `-${props.r}px` : '0'}
        width={d + offset * 2}
        height={r + offset}
    >
      <svg viewBox={`0 0 ${d + offset * 2} ${r + offset * 2}`}>
        <path id="curve" d={`M${offset},${r + offset} A${r},${r} 0 0,1 ${d + offset},${r + offset}`} />
        <text width="500">
          <textPath xlinkHref="#curve" startOffset="50%">
            {text}
          </textPath>
        </text>
      </svg>
    </CurvedText>
  );
}
