import React from 'react';
import styled from "styled-components";


const ProcessBlock = ({process}) => {

  const ProcessContainer = styled.div`
    display: table;
    position: relative;
    width: 100%;
    height: ${process.imgFlanked ? "120px" : "190px" };
    margin-bottom: 30%;
    &:last-child {
      margin-bottom: 0;
    }
  `;
  
  const Info = styled.div`
    position: absolute;
    width: ${process.processTitle === "DISTILL" ? "60%" : "42%"};
    margin-top: ${process.imgFlanked ? "2.25%" : "0"};
    top: ${process.imgFlanked ? "0" : "45%" };
    left: ${process.processTitle === "DISTILL" ? "20%" : "29%"};
    z-index: 2;
  `;
  
  const ProcessTitle = styled.h1`
    margin: 5% 0 5px 0;
    font-weight: normal;
    font-size: min(max(16px, 4vw), 40px);
    text-align: center;
    color: #787878;
  `;
  
  const Description = styled.p`
    margin: 0 auto;
    padding: 0;
    font-size: min(max(15px, 3vw), 18px);
    line-height: min(max(18px, 3vw), 32px);
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
  `;
  
  const ImgRight = styled.img`
    display: block;
    float: right;
    width: 30%;
  `;
  
  const FullWidthImg = styled.img`
    display: block;
    width: 100%;
    margin: 0 auto;
    z-index: 1;
  `;

  return( 
  <ProcessContainer>
    <Info>
      <ProcessTitle>{process.processTitle}</ProcessTitle>
      <Description>{process.description}</Description>
    </Info>
    {process.imgFlanked ? (
      <FlankImgWrapper>
        <ImgLeft src={`${process.imgLeft}`}/>
        <ImgRight src={`${process.imgRight}`}/>
      </FlankImgWrapper>
    ) : (
      <FullWidthImg src={`${process.fullWidthImg}`}/>
    )}
  </ProcessContainer>
  );
}

export default ProcessBlock;