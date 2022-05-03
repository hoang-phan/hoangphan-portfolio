import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 5px;
  left: 50px;
  right: calc(30% + 95px);
  bottom: calc(30% - 5px);
  color: #red;
  z-index: 100;
  contain: content;

  .scene1 {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .lyr1-1 {
    background-image: url("lyr1-1.png");
    background-size: auto 100%;
  }

  .lyr1-2 {
    background-image: url("lyr1-2.png");
    background-repeat: no-repeat;
    background-position: 7% 30%;
  }

  .lyr1-3 {
    background-image: url("lyr1-3.png");
    background-repeat: repeat-x;
    background-size: auto 100%;
  }

  .lyr1-4 {
    background-image: url("lyr1-4.png");
    background-repeat: repeat-x;
    background-position-y: bottom -150px;
  }

  .lyr2-1 {
    background-image: url("lyr2-1.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .lyr2-2 {
    background-image: url("lyr2-2.png");
    background-repeat: repeat-x;
    background-size: auto 100%;
  }

  .lyr2-3 {
    background-image: url("lyr2-3.png");
    background-repeat: repeat-x;
    background-size: auto 100%;
  }

  .lyr2-4 {
    background-image: url("lyr2-4.png");
    background-repeat: repeat-x;
    background-size: auto 100%;
  }

  .character {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 100px;
    z-index: 10;
    background-color: transparent;
    transform: scale(0.3);
  }

  @keyframes opendescription {
    0% { right: -60%; opacity: 0; }
    100% { right: 0; opacity: 1; }
  }

  @keyframes fadein {
    0% { opacity: 0; margin-left: 10px; }
    100% { opacity: 1; margin-left: 0px; }
  }

  .project-description {
    background-color: rgba(1, 1, 1, 0.5);
    color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 60%;
    right: 0px;
    padding: 10px;

    h4, p {
      text-align: left;
      margin-right: 60px;
    }

    h3 {
      margin-right: 90px;
      text-align: right;
    }

    &.current {
      animation: opendescription 2s;

      &.transitioning {
        h3, h4, p {
          animation: fadein 1s;
        }
      }
    }
  }

  .milestones {
    z-index: 9999;
    position: absolute;
    width: 100px;
    height: 100%;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .company, .project {
      cursor: pointer;
      z-index: 9999;
      margin: 5px;
    }

    .company {
      border-radius: 50%;
      border: 5px solid #000;
      width: 70px;
      height: 70px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 50%;
        height: 50%;
      }
    }

    .project {
      background-image: url("shuriken-1.png");
      background-size: 100% 100%;
      width: 50px;
      height: 50px;
      transition: transform 1s ease;

      @keyframes rotating {
        0% { transform: rotate(0deg) }
        100% { transform: rotate(360deg) }
      }

      &.active {
        background-image: url("shuriken-2.png");
        animation: rotating 4s infinite linear;
      }
    }
  }

  img {
    position: relative;

    &.left {
      transform: scaleX(-1);
    }
  }
`;

const Scene = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }

  .scroller {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 2000px;
    background-color: transparent;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;


export { Container, Scene };
