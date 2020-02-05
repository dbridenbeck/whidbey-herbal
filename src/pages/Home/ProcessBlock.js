import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

  const ProcessContainer = styled.div`
    display: block;
    position: relative;
    width: 40%;
    border: 1px solid green;
    :nth-child(even) {
      margin-top: 230px;
      align-self: baseline;
    }
    :last-child {
      margin: 136px auto 0 5%;
    }
  `;
  
  const Info = styled.div`
    position: relative;
    .title {
      font-family: "Domine", sans-serif;
      font-weight: normal;
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
  float: left;
  width: 30%;
  height: auto;
`;
  
const ProcessBlock = ({
  process: {
    imgFlanked,
    processTitle,
    description,
    img,
    width,
    height,
    alt,
  }
}) => {
return (
  <ProcessContainer imgFlanked={imgFlanked}>
    <Info 
      imgFlanked={imgFlanked}
      processTitle={processTitle}
    >
      <h3 className="title">{processTitle}</h3>
      <p className="description">{description}</p>
    </Info>
        <Img
          src={`${img}`}
          width={`${width}`}
          height={`${height}`}
          alt={`${alt}`}
        />
  </ProcessContainer>
);
}

ProcessBlock.propTypes = {
  imgFlanked: PropTypes.bool,
  processTitle: PropTypes.string,
  description: PropTypes.string,
  imgLeft: PropTypes.string,
  imgRight: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
  fullWidthImg: PropTypes.string
};

export default ProcessBlock;