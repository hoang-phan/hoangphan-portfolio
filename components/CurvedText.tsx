import React from 'react';
import styled from 'styled-components';
const CurvedTextWrapper = styled.div`
  margin-bottom: ${(props: any) => props.marginBottom};
  width: ${(props: any) => props.width}px;
  height: ${(props: any) => props.height}px;
  path {
    fill: transparent;
  }
  text {
    fill: currentColor;
    text-anchor: middle;
  }
`;

interface ICurvedTextProps {
  text: string;
  objectSize?: number;
  spacing?: number;
  offset?: number;
  overlap?: boolean;
}

const CurvedText: React.FC<ICurvedTextProps> = ({ text, objectSize = 120, spacing = 12, offset = 30, overlap = false }: ICurvedTextProps) => {
  const d = objectSize + spacing * 2;
  const r = objectSize / 2 + spacing / 2;

  return (
    <CurvedTextWrapper
      className="curved-text"
      style={{
        marginBottom: overlap ? -r : 0,
        width: "100%",
        height: "100%",
        marginTop: "5%",
      }}
    >
      <svg viewBox={`0 0 ${d + offset * 2} ${r + offset * 2}`}>
        <path id="curve" d={`M${offset},${r + offset} A${r},${r} 0 0,1 ${d + offset},${r + offset}`} />
        <text width="500">
          <textPath xlinkHref="#curve" startOffset="50%">
            {text}
          </textPath>
        </text>
      </svg>
    </CurvedTextWrapper>
  );
}

export default CurvedText;
