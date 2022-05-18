import React, { useState, useEffect } from 'react';
import { Container } from './styles';
import Vara from 'vara';

interface IAboutMeProps {
  pageBound?: number[];
}

const AboutMe: React.FC<IAboutMeProps> = ({pageBound}: IAboutMeProps) => {
  const width = pageBound[3] * 0.88;
  const height = pageBound[2] * 0.58;
  const top = pageBound[0] + height * 0.05;
  const left = pageBound[1] + width * 0.064;
  const fontSize = height / 20;

  useEffect(() => {
    new Vara(
      "#container", "https://cdn.jsdelivr.net/npm/vara@1.4.0/fonts/Satisfy/SatisfySL.json",
      [
        {
          text: "Hi, my name is Hoang,",
          y: height * 0.1,
          fromCurrentPosition: { y: false },
          duration: 2000
        },
        {
          text: "I'm a Full Stack Developer, specialize in Ruby on Rails and can do a little ReactJS.",
          y: height * 0.35,
          fromCurrentPosition: { y: false },
          delay: 500,
          duration: 6000
        },
        {
          text: "Thanks for checking out my personal website, have fun!",
          y: height * 0.7,
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
  }, [])

  return (
    <Container id="container" style={{top, left, width, height}}>
    </Container>
  )
}

export default AboutMe
