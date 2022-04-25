import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  color: #4f4338;
  text-align: center;
  background-color: #d0dbe6;
`

const Header = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  z-index: 999;
  width: 100%;
  font-size: 2rem;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }

  h1 {
    font-size: inherit;
  }

  span {
    background: linear-gradient(orange, red);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

const BodyModel = styled.div`
  position: absolute;
  bottom: 0;

  left: -15%;
  width: 100%;
  height: 100%;

  cursor: pointer;
  background-color: transparent;
`

const Hero = styled.div`
  position: absolute;
  bottom: 0;

  right: 0;
  width: 30%;
  height: 100%;
  max-width: 400px;

  cursor: pointer;
  background-color: transparent;

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;

  h1, h2 {
    color: #4f4338;
    padding: 10px;
    margin: 0;
  }

  h1 {
    font-size: 4rem;
    letter-spacing: 2px;
    border-bottom: 3px solid #4f4338;
  }

  h2 {
    font-size: 2rem;
    letter-spacing: 5px;
  }
`

const Menu = styled.div`
  .caret {
    position: fixed;
    z-index: 99;
    transition: left 0.3s ease, top 0.3s ease, opacity 0.3s ease;
    width: 124px;
    height: 124px;
    top: 100px;
    left: calc(100% - 200px);

    .menu-label {
      position: relative;
      top: 12px;
      left: 12px;
      width: 100px;
      height: 100px;
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
      top: 12px;
      left: 12px;
      width: 100px;
      height: 100px;
      border: 2px solid #4f4338;
      border-radius: 50%;
      background-color: rgb(255,255,255,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease;
    }

    &:hover {
      .menu-label {
        top: 0;
        left: 0;
        width: 124px;
        height: 124px;

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

    &.hidden {
      opacity: 0;
      pointer-events: none;
    }
  }
`

export { Container, Header, BodyModel, Hero, Menu }
