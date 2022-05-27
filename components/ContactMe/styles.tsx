import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  width: 70%;
  height: 100%;
  top: 0;
  left: 0;
  background: #d0dbe6;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2em;

    .row {
      display: flex;
      width: 100%;

      input {
        width: 50%;
        margin: 10px;
        padding: 10px;
        font-size: 1.5em;
      }
    }

    .flex-end {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      button {
        font-size: 1.2em;
        letter-spacing: 1px;
        margin: 10px;
      }
    }

    textarea {
      width: 100%;
      height: 200px;
      padding: 10px;
      margin: 10px;
      font-size: 2em;
    }
  }

  img {
    max-width: 100%;
  }

  @media (orientation: portrait) {
    width: 100%;
    left: 0;
    top: 20%;
    bottom: 0;
    height: auto;

    form {
      .row input {
        font-size: 1em;
      }

      textarea {
        font-size: 1.3em;
      }

      .flex-end button {
        font-size: 1em;
      }
    }
  }

  @media (max-height: 600px) {
    form {
      .row input {
        font-size: 1em;
      }

      textarea {
        font-size: 1.3em;
      }

      .flex-end button {
        font-size: 1em;
      }
    }
  }
`;

export { Container };
