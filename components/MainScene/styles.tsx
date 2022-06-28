import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  color: #4f4338;
  text-align: center;
  background: #26292c;
`

const MainWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;

  @media (orientation: portrait) {
    flex-direction: column-reverse;
  }
`

const MainContent = styled.div`
  position: relative;
  width: 70%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;

  @media (orientation: portrait) {
    width: 100%;
    height: 80%;
  }
`

const BodyModel = styled.div`
  width: 100%;
  height: 100%;
  position: absolute
  cursor: pointer;
  background-color: transparent;
`

const Hero = styled.div`
  width: 30%;
  height: 100%;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    position: absolute;
    top: 0;
  }

  @keyframes nameanim {
    0% { margin-left: 27px; margin-bottom: -27px; text-shadow: #b76261 1px 1px; }
    50% { margin-left: 27px; margin-bottom: -27px; text-shadow: #b76261 1px 1px; }
    100% {
      margin-bottom: 0;
      margin-left: 0;
      text-shadow: #b76261 1px 1px,
                  #b76261 2px 2px,
                  #b76261 3px 3px,
                  #b76261 4px 4px,
                  #b76261 5px 5px,
                  #b76261 6px 6px,
                  #b76261 7px 7px,
                  #b86362 8px 8px,
                  #b86362 9px 9px,
                  #b86362 10px 10px,
                  #b86362 11px 11px,
                  #b86362 12px 12px,
                  #b96463 13px 13px,
                  #b96463 14px 14px,
                  #b96463 15px 15px,
                  #b96463 16px 16px,
                  #b96463 17px 17px,
                  #b96463 18px 18px,
                  #b96463 19px 19px,
                  #ba6462 20px 20px,
                  #ba6463 21px 21px,
                  #ba6464 22px 22px,
                  #ba6465 23px 23px,
                  #ba6466 24px 24px,
                  #ba6467 25px 25px,
                  #ba6468 26px 26px,
                  #ba6469 27px 27px;
    }
  }

  @keyframes titleanim {
    0% { margin-top: 200%; margin-left: 27px; text-shadow: #3c99dc 1px 1px; }
    50% { margin-top: 27px; margin-left: 27px; text-shadow: #3c99dc 1px 1px; }
    100% {
      margin-top: 0;
      margin-left: 0;
      text-shadow: #3c99dc 1px 1px,
                  #3c99dc 2px 2px,
                  #3c99dc 3px 3px,
                  #3c99dc 4px 4px,
                  #3c99dc 5px 5px,
                  #3c99dc 6px 6px,
                  #3c99dc 7px 7px,
                  #3c99dc 8px 8px,
                  #3c99dc 9px 9px,
                  #3c99dc 10px 10px,
                  #3c99dc 11px 11px,
                  #3c99dc 12px 12px,
                  #3caadf 13px 13px,
                  #3caadf 14px 14px,
                  #3caadf 15px 15px,
                  #3caadf 16px 16px,
                  #3caadf 17px 17px,
                  #3dabe0 18px 18px,
                  #3dabe1 19px 19px,
                  #3eace2 20px 20px,
                  #3eace3 21px 21px,
                  #3eace4 22px 22px,
                  #3eace5 23px 23px,
                  #3eace6 24px 24px,
                  #3eace7 25px 25px,
                  #3eace8 26px 26px,
                  #3eace9 27px 27px;
    }
  }

  .name-wrapper {
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    letter-spacing: 2px;
    text-align: left;
    color: #fff;
    text-align: left;
    z-index: 2;
    cursor: pointer;
    margin: 0;
  }

  h1.name {
    height: 80px;
    width: 100%;
    font-size: 3.5rem;
    text-shadow: #b76261 1px 1px,
                  #b76261 2px 2px,
                  #b76261 3px 3px,
                  #b76261 4px 4px,
                  #b76261 5px 5px,
                  #b76261 6px 6px,
                  #b76261 7px 7px,
                  #b86362 8px 8px,
                  #b86362 9px 9px,
                  #b86362 10px 10px,
                  #b86362 11px 11px,
                  #b86362 12px 12px,
                  #b96463 13px 13px,
                  #b96463 14px 14px,
                  #b96463 15px 15px,
                  #b96463 16px 16px,
                  #b96463 17px 17px,
                  #b96463 18px 18px,
                  #b96463 19px 19px,
                  #ba6462 20px 20px,
                  #ba6463 21px 21px,
                  #ba6464 22px 22px,
                  #ba6465 23px 23px,
                  #ba6466 24px 24px,
                  #ba6467 25px 25px,
                  #ba6468 26px 26px,
                  #ba6469 27px 27px;
    animation: nameanim 2s;
  }

  h1.jobtitle {
    height: 70px;
    width: 100%;
    font-size: 3rem;
    text-shadow: #3c99dc 1px 1px,
                  #3c99dc 2px 2px,
                  #3c99dc 3px 3px,
                  #3c99dc 4px 4px,
                  #3c99dc 5px 5px,
                  #3c99dc 6px 6px,
                  #3c99dc 7px 7px,
                  #3c99dc 8px 8px,
                  #3c99dc 9px 9px,
                  #3c99dc 10px 10px,
                  #3c99dc 11px 11px,
                  #3c99dc 12px 12px,
                  #3caadf 13px 13px,
                  #3caadf 14px 14px,
                  #3caadf 15px 15px,
                  #3caadf 16px 16px,
                  #3caadf 17px 17px,
                  #3dabe0 18px 18px,
                  #3dabe1 19px 19px,
                  #3eace2 20px 20px,
                  #3eace3 21px 21px,
                  #3eace4 22px 22px,
                  #3eace5 23px 23px,
                  #3eace6 24px 24px,
                  #3eace7 25px 25px,
                  #3eace8 26px 26px,
                  #3eace9 27px 27px;
    animation: titleanim 2s;

    .title-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      color: #3f51b5;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  @media (orientation: portrait) {
    width: 100%;
    height: 20%;

    h1.name, h1.jobtitle {
      font-size: 2rem;
      text-align: center;

      .title-overlay {
        display: none;
      }
    }

    h1.name {
      height: 3rem;
    }

    .name-wrapper {
      bottom: 0;
    }
  }

  @media (max-width: 1280px) {
    h1.name, h1.jobtitle {
      font-size: 2rem;
      letter-spacing: 1px;

      .title-overlay {
        letter-spacing: 1px;
      }
    }
  }

  @media (max-height: 600px) {
    h1.name, h1.jobtitle {
      font-size: 2rem;
      letter-spacing: 1px;
    }

    h1.name {
      height: 3rem;
    }
  }

  @media (max-height: 480px) {
    h1.name, h1.jobtitle {
      font-size: 1.5rem;
      letter-spacing: 1px;
    }

    h1.name {
      height: 2.5rem;
    }
  }

  @media (max-width: 400px) {
    h1.name, h1.jobtitle {
      font-size: 1rem;
      letter-spacing: 1px;
      height: 2rem;
    }
  }

`

const HeroModel = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;

  @media (orientation: portrait) {
    height: 100%;
    max-width: 50vh;
  }
`

const Menu = styled.div`
  .caret {
    position: absolute;
    z-index: 999;
    transition: left 0.3s ease, top 0.3s ease, opacity 0.3s ease;

    &.back {
      top: 50%;
      right: 5px;
    }

    .menu-label {
      position: relative;
      top: 8%;
      left: 8%;
      width: 84%;
      height: 84%;
      border: 2px solid #4f4338;
      border-radius: 50%;
      background-color: rgb(255,255,255,0.6);
      transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease;

      svg {
        opacity: 0;
        transition: opacity 0.3s ease;
      }
    }

    .menu-icon {
      position: absolute;
      top: 8%;
      left: 8%;
      width: 84%;
      height: 84%;
      border: 2px solid #4f4338;
      border-radius: 50%;
      background-color: rgb(255,255,255,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease;
    }

    &.hidden {
      opacity: 0;
      pointer-events: none;
    }

    @media (min-width: 640.1px) {
      &:hover {
        .menu-label {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;

          svg {
            opacity: 1;
          }
        }
        .menu-icon {
          width: 40%;
          height: 40%;
          top: 30%;
          left: 30%;
        }
      }
    }

    @media (orientation: portrait) {
      top: 1%;
    }
  }
`

export { Container, BodyModel, HeroModel, Menu, MainWrapper, Hero, MainContent }
