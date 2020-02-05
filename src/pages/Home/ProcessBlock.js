import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

  const ProcessContainer = styled.div`
    display: block;
    position: relative;
    width: 40%;
    /* help stagger horizontal positioning of process blocks */
    :nth-child(even) {
      margin-top: 230px;
      align-self: baseline;
    }
    :last-child {
      margin: 0px auto 0 5%;
    }
  `;
  
  const Info = styled.div`
    position: relative;
    margin: 0;
    .title {
      margin: ${props => (props.isLandscape ? "0 0 32px 0" : "48px 0 32px 0")};
      padding: 0;
      font-family: "Domine", sans-serif;
      font-weight: normal;
      font-style: normal;
      font-size: 2.5rem;
      text-align: center;
      color: #787878;
    }
    .description {
      margin: 0 auto;
      padding: 0;
      font-size: 1.5rem;
      line-height: 1.375em;
      font-weight: 300;
      text-align: center;
      font-style: normal;
      letter-spacing: 0.01em;
      color: #787878;
    }
  `;
    
const Img = styled.img`
  display: block;
  margin: 0 auto;
  /* handle width for images that are landscape */
  width: ${props => props.isLandscape ? "100%" : "60%"};
  height: auto;
`;
  
const ProcessBlock = ({
  process: {
    isLandscape,
    processTitle,
    description,
    img,
    width,
    height,
    alt,
  }
}) => {
return (
  <ProcessContainer>
    <Img
      src={`${img}`}
      width={`${width}`}
      height={`${height}`}
      alt={`${alt}`}
      isLandscape={isLandscape}
    />
    <Info isLandscape={isLandscape}>
      <h6 className="title">{processTitle}</h6>
      <p className="description">{description}</p>
    </Info>
  </ProcessContainer>
);
}

ProcessBlock.propTypes = {
  isLandscape: PropTypes.bool,
  processTitle: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
};

export default ProcessBlock;