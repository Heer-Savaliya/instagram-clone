import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loading">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loading {
   --speed-of-animation: 0.9s;
   --gap: 6px;
   --first-color: #feda75;
    --second-color: #fa7e1e;
    --third-color: #d62976;
    --fourth-color: #962fbf;
    --fifth-color: #4f5bd5;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   gap: 6px;
   height: 100vh;
  }

  .loading span {
   width: 5px;
   height: 80px;
   background: var(--first-color);
   animation: scale var(--speed-of-animation) ease-in-out infinite;
  }

  .loading span:nth-child(2) {
   background: var(--second-color);
   animation-delay: -0.8s;
  }

  .loading span:nth-child(3) {
   background: var(--third-color);
   animation-delay: -0.7s;
  }

  .loading span:nth-child(4) {
   background: var(--fourth-color);
   animation-delay: -0.6s;
  }

  .loading span:nth-child(5) {
   background: var(--fifth-color);
   animation-delay: -0.5s;
  }

  @keyframes scale {
   0%, 40%, 100% {
    transform: scaleY(0.05);
   }

   20% {
    transform: scaleY(1);
   }
  }`;

export default Loader;
