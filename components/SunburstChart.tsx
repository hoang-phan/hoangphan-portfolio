import React from "react";
import Sunburst from 'sunburst-chart';

export default function SunburstChart() {

  const chart = React.useRef(null)

  const data = {
    name: "Skills",
    children: [
      {
        name: "Basic Science",
        color: "#FF0000",
        children: [
          {
            name: "Math",
            value: 3
          },
          {
            name: "Physics",
            value: 2
          },
        ],
      },
      {
        name: "Programming Stacks",
        color: "#FFFF00",
        children: [
          {
            name: "Ruby on Rails",
            value: 10
          },
          {
            name: "ReactJS",
            value: 8
          },
        ],
      },
      {
        name: "Critical Thinking",
        color: "#00FF00",
        children: [
          {
            name: "Problem Solving",
            value: 4
          },
          {
            name: "Observation",
            value: 3
          },
        ],
      },
    ]
  };
  
  const ref = React.useRef(null)

  React.useEffect(() => {
    const color = (section, parent) => {
      if (!section) {
        return null;
      }
      return section.color || parent && color(parent.data, parent.parent);
    }
    chart.current = Sunburst()
    chart.current
      .data(data)
      .color((section, parent) => color(section, parent))
      .width(500)
      .height(500)
      .excludeRoot(true)
      .radiusScaleExponent(0.4)
      (ref.current)
  }, [])

  return(
    <div ref={ref} id="sunburst" />
  )

}
