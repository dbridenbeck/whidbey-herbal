import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

  const ProcessContainer = styled.div`
    display: table;
    position: relative;
    width: 100%;
    /* Ternary deals with if process is flanked by two images or not */
    height: ${props => props.imgFlanked ? "120px" : "190px" };
    margin-bottom: 30%;
    &:last-child {
      margin-bottom: 0;
    }
  `;
  
  const Info = styled.div`
    position: absolute;
    top: ${props => (props.imgFlanked ? "10%" : "45%")};
    /* the "Distill" process needs some special casing due to it's image dimensions */
    left: ${props => (props.processTitle === "DISTILL" ? "20%" : "29%")};
    width: ${props => (props.processTitle === "DISTILL" ? "60%" : "42%")};
    margin-top: ${process.imgFlanked ? "2.25%" : "0"};
    z-index: 2;
  `;
  
  const ProcessTitle = styled.h2`
    margin: 5% 0 5px 0;
    font-weight: normal;
    font-size: 1.5em;
    text-align: center;
    color: #787878;
  `;
  
  const Description = styled.p`
    margin: 0 auto;
    padding: 0;
    font-size: 0.875em;
    line-height: 1.5em;
    text-align: center;
    font-style: normal;
    letter-spacing: 0.01em;
    color: #787878;
  `;
  
  const FlankImgWrapper = styled.div`
    display: table;
    position: relative;
    width: 100%;
    height: 100%;
  `;
  
  const ImgLeft = styled.img`
    display: block;
    float: left;
    width: 30%;
    height: auto;
  `;
  
  const ImgRight = styled.img`
    display: block;
    float: right;
    width: 30%;
    height: auto;
  `;
  
  const FullWidthImg = styled.img`
    display: block;
    width: 100%;
    height: auto;
    margin: 0 auto;
    z-index: 1;
  `;

const ProcessBlock = ({process}) => {

return (
  <ProcessContainer imgFlanked={process.imgFlanked}>
    <Info 
      imgFlanked={process.imgFlanked}
      processTitle={process.processTitle}
    >
      <ProcessTitle>{process.processTitle}</ProcessTitle>
      <Description>{process.description}</Description>
    </Info>
    {/* Render FlankImgWrapper if process is flanked by images, otherwise use FullWidthImg */}
    {process.imgFlanked ? (
      <FlankImgWrapper>
        <ImgLeft
          src={`${process.imgLeft}`}
          width={`${process.width}`}
          height={`${process.height}`}
          alt={`${process.alt}`}
        />
        <ImgRight src={`${process.imgRight}`} />
      </FlankImgWrapper>
    ) : (
      <FullWidthImg src={`${process.fullWidthImg}`} />
    )}
  </ProcessContainer>
);
}

ProcessBlock.propTypes = {
  process: PropTypes.object,
}

export default ProcessBlock;