import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import Vara from 'vara';
import SvgDrawable from './SvgDrawable';

interface IAboutMeProps {
  pageBound?: number[];
}

const profiles = [
  {
    text: "@github",
    htmlId: "github-link",
    href: "https://github.com/hoang-phan",
    svgPath: [
      "M 100 4 c -53.008 0 -96 42.984 -96 96 c 0 42.416 27.504 78.4 65.656 91.096 c 4.792 0.888 6.344 -2.088 6.344 -4.616 v -17.872 c -26.704 5.808 -32.264 -11.328 -32.264 -11.328 c -4.368 -11.096 -10.664 -14.048 -10.664 -14.048 c -8.712 -5.96 0.664 -5.832 0.664 -5.832 c 9.64 0.672 14.712 9.896 14.712 9.896 c 8.56 14.672 22.456 10.432 27.936 7.976 c 0.856 -6.2 3.344 -10.44 6.096 -12.832 c -21.32 -2.44 -43.736 -10.672 -43.736 -47.448 c 0 -10.488 3.752 -19.048 9.888 -25.768 c -0.992 -2.424 -4.28 -12.192 0.936 -25.408 c 0 0 8.064 -2.576 26.408 9.84 c 7.656 -2.128 15.864 -3.192 24.024 -3.232 c 8.16 0.04 16.376 1.104 24.048 3.232 c 18.328 -12.416 26.376 -9.84 26.376 -9.84 c 5.224 13.224 1.936 22.992 0.944 25.408 c 6.16 6.72 9.88 15.288 9.88 25.768 c 0 36.872 -22.456 44.992 -43.832 47.368 c 3.44 2.976 6.584 8.816 6.584 17.776 v 26.344 c 0 2.552 1.536 5.552 6.408 4.608 c 38.12 -12.712 65.592 -48.688 65.592 -91.088 c 0 -53.016 -42.984 -96 -96 -96 z",
    ],
  },
  {
    text: "@stackoverflow",
    htmlId: "sof-link",
    href: "https://stackoverflow.com/users/5109043/hoang-phan",
    svgPath: [
      "M 32 136 v 8 a 16 16 90 0 0 16 16 h 96 a 16 16 90 0 0 16 -16 v -8",
      "M 64 128 h 64",
      "M 66.576 100.656 l 63.648 6.688",
      "M 70.296 73.344 l 62.608 13.312",
      "M 80.768 46.112 l 60.864 19.776",
    ]
  },
];

const AboutMe: React.FC<IAboutMeProps> = ({pageBound}: IAboutMeProps) => {
  const width = pageBound[3] * 0.88;
  const height = pageBound[2] * 0.58;
  const top = pageBound[0] + height * 0.05;
  const left = pageBound[1] + width * 0.064;
  const fontSize = height / 20;

  useEffect(() => {
    new Vara(
      "#intro", "fonts/Satisfy/SatisfySL.json",
      [
        {
          text: "Hi, my name is Hoang,",
          y: height * 0.1,
          fromCurrentPosition: { y: false },
          duration: 2000
        },
        {
          text: "I'm a Full Stack Developer, specialize in Ruby on Rails and can do a little ReactJS.",
          y: height * 0.2,
          fromCurrentPosition: { y: false },
          delay: 500,
          duration: 6000
        }
      ],
      {
        strokeWidth: 2,
        color: "#fff",
        fontSize,
        textAlign: "center"
      }
    );

    profiles.forEach((profile) => {
      new Vara(
        `#${profile.htmlId}`, "fonts/Satisfy/SatisfySL.json",
        [
          {
            text: profile.text,
            y: height * 0.1,
            fromCurrentPosition: { y: false },
            delay: 13000,
            duration: 2000
          }
        ],
        {
          strokeWidth: 2,
          color: "#fff",
          fontSize: fontSize * 0.8,
          textAlign: "center"
        }
      );
    });
  }, [])

  return (
    <Container style={{top, left, width, height}}>
      <div id="intro" />
      <div id="social-links">
        {profiles.map((profile, index) => (
          <a key={profile.htmlId} id={profile.htmlId} className="social-link" href={profile.href} target="_blank">
            <SvgDrawable size={height * 0.2} position={index} paths={profile.svgPath} animationDelay={9} />
          </a>
        ))}
      </div>
    </Container>
  )
}

export default AboutMe
