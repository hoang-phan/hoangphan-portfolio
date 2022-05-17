import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  z-index: 100;
  contain: content;
  display: flex;
  border-radius: 10px;
`;

const ProjectCardWrapper = styled.div`
  width: 50%;
  height: 100%;
`;

const ProjectCard = styled.div`
  width: 100%;
  height: 50%;
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 0;

  .backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0.5;
    transition: opacity 0.5s ease;
  }

  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 5;
    color: #fff;
    opacity: 0;
    transition: opacity 0.5s ease;

    .project-name {
      font-size: 2em;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 2em;
      margin-bottom: 1em;

      .tag {
        font-size: 1em;
        padding: 1em;
        letter-spacing: 1px;
      }
    }

    .actions {
      display: flex;

      button {
        margin: 2em 0.2em;

        span {
          margin-left: 0.3em;
          margin-top: 0.15em;
        } 
      }
    }
  }

  &:hover, &.active {
    .backdrop {
      opacity: 1 !important;
    }

    .content {
      opacity: 1 !important;
    }
  }

  &.active {
    z-index: 200;
  }

  &:not(.active) {
    transition: z-index 0.01s ease;
    transition-delay: 0.6s;
  }

  &.hero {
    width: 50%;
    height: 100%;

    .backdrop {
      opacity: 0.1;
    }
  }

  @media (pointer:none), (pointer:coarse) {
    .backdrop {
      opacity: 1 !important;
    }

    .content {
      opacity: 1 !important;
    }
  }

  @media (max-width: 910px) {
    .content {
      .tags {
        margin-top: 1em;
        margin-bottom: 0.5em;

        .tag {
          font-size: 0.75em;
        }
      }

      .actions {
        button {
          span.button-text {
            display: none;
          }
        }
      }
    }
  }

  @media (max-width: 640px) {
    .content {
      .project-name {
        font-size: 1em;
      }

      .tags {
        margin-top: 1em;
        margin-bottom: 0.5em;

        .tag {
          font-size: 0.5em;
        }
      }

      .actions {
        button {
          padding: 2px;
          min-width: 40px;
          width: 40px;
          span.button-text {
            display: none;
          }
        }
      }
    }
  }

`;

const ProjectDetails = styled.div`
  position: absolute;
  width: 100%;
  height: 0;
  z-index: 100;
  background-color: #000;
  color: #fff;
  transition: height 0.5s ease;

  &.active {
    height: 100%;

    .details-container {
      opacity: 1;
    }
  }

  .details-container {
    position: absolute;
    padding: 1em;
    width: 50%;
    height: 100%;
    top: 0;
    opacity: 0;
    text-align: left;
  }

  &.left-details {
    .details-container {
      left: 0;
    }
  }

  &.right-details {
    .details-container {
      left: 50%;
    }
  }

  @media (max-width: 640px) {
    font-size: 0.75rem;
  }
`;

export { Container, ProjectCardWrapper, ProjectCard, ProjectDetails };
