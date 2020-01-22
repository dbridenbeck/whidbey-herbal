import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

  const ProcessContainer = styled.div`
    display: table;
    position: relative;
    width: 100%;
    /* Ternary deals with if process is flanked by two images or not */
    height: ${props => props.imgFlanked ? "120px" : "190px" };
    margin-bottom: 200px;
  `;
  
  const Info = styled.div`
    position: absolute;
    top: ${props => (props.imgFlanked ? "10%" : "45%")};
    /* the "Distill" process needs some special casing due to it's image dimensions */
    left: ${props => (props.processTitle === "DISTILL" ? "20%" : "29%")};
    width: ${props => (props.processTitle === "DISTILL" ? "60%" : "42%")};
    margin-top: ${process.imgFlanked ? "2.25%" : "0"};
    z-index: 2;
    .title {
      margin: 5% 0 5px 0;
      font-weight: normal;
      font-size: 1.5em;
      text-align: center;
      color: #787878;
    }
    .description {
      margin: 0 auto;
      padding: 0;
      font-size: 0.875em;
      line-height: 1.5em;
      text-align: center;
      font-style: normal;
      letter-spacing: 0.01em;
      color: #787878;
    }
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

const ProcessBlock = ({
  process: {
    imgFlanked,
    processTitle,
    description,
    imgLeft,
    imgRight,
    width,
    height,
    alt,
    fullWidthImg
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
    {/* Render FlankImgWrapper if process is flanked by images, otherwise use FullWidthImg */}
    {imgFlanked ? (
      <FlankImgWrapper>
        <ImgLeft
          src={`${imgLeft}`}
          width={`${width}`}
          height={`${height}`}
          alt={`${alt}`}
        />
        <ImgRight src={`${imgRight}`} />
      </FlankImgWrapper>
    ) : (
      <FullWidthImg src={`${fullWidthImg}`} />
    )}
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