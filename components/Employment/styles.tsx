import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
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
    background-size: auto 30%;
  }

  .lyr1-3 {
    background-image: url("lyr1-3.png");
    background-repeat: repeat-x;
    background-size: auto 100%;
  }

  .lyr1-4 {
    background-image: url("lyr1-4.png");
    background-repeat: repeat-x;
    background-size: auto 30%;
    background-position-y: 100%;
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
    z-index: 10;
    background-color: transparent;

    img {
      height: 100%;

      &.left {
        transform: scaleX(-1);
      }
    }
  }
`;

const TextPanel = styled.div`
  @keyframes opendescription {
    0% { right: -60%; opacity: 0; }
    100% { right: 0; opacity: 1; }
  }

  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 0;
  width: 70%;
  height: 100%;
  z-index: 999;

  .company {
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .company-logo {
      border-radius: 50%;
      border: 5px solid #000;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 50%;
        height: 50%;
      }
    }

    .company-description {
      justify-content: center;
      display: flex;
      align-items: center;
      background-color: #fff;
      font-size: 2em;
      flex: 1;
      margin-left: 1em;
      border-radius: 50px 0 0 50px;
      margin-right: -10px;
      border: 5px solid #000;
    }
  }

  .content-panel {
    display: flex;
    flex: 1;
    overflow: scroll;
  }

  .right-panel {
    z-index: 9999;
    height: 100%;
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
`

const ScrollWrapper = styled.div`
  background-color: rgba(1, 1, 1, 0.5);
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  z-index: 0;
  margin-left: 4em;

  ::-webkit-scrollbar {
    display: none;
  }

  .projects-description {
    padding-left: 1em;
    color: #fff;
    width: 100%;
    flex: 1;
    -ms-overflow-style: none;
    scrollbar-width: none;

    .project-description {
      margin-top: 4em;
    }

    img {
      width: 100%;
    }

    h4, p {
      text-align: left;
    }

    h3 {
      text-align: center;
    }

    &.current {
      animation: opendescription 2s;
    }

    @media (max-width: 640px){
      font-size: 0.675rem;

      h4.section-title {
        display: none;
      }
    }

    @media (max-height: 480px) {
      font-size: 0.675rem;

      h4.section-title {
        display: none;
      }
    }
  }
`;


export { Container, TextPanel, ScrollWrapper };
