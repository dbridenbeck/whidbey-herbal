import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { device } from "../../utils/devices";

import * as CartActionCreators from "../../state/actions/cart";
import styled from "styled-components";

// Begin Styled Components
const ProductImagesWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  @media ${device.tablet} {
    width: 45%;
  }
  @media ${device.laptop} {
    width: 35%;
  }
`;

const HeroImage = styled.img`
  display: block;
  margin: 2.5% auto 30px auto;
  width: 100%;
  height: auto;
  /* border: 4px solid #e3be42; */
  border-radius: 10px;
`;

const AltImages = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: flex-start;
  height: auto;
  width: 100%;
  margin: 0 auto;
`;

const AltImage = styled.img`
  display: block;
  width: 25%;
  align-self: center;
  margin: 10px;
  border: ${props =>
    props.isSelected ? "2px solid #e3be42" : "2px solid #DADADA"};
  border-radius: 10px;
  :hover {
    border: ${props =>
      props.isSelected ? "2px solid #e3be42" : "2px solid #787878"};
  }
`;

// begin component
const ProductImages = ({
  images,
  heroImgSrc,
  heroImgId,
  handleHeroImg,
  selectedProduct: {availableForSale}
}) => {

  // when clicked, AltImage updates state and sets heroImg's src to AltImage
  const createAltImage = image => {
    const {
      node: {
        id, 
        src, 
        altText
      }
    } = image;
    const setHeroImg = () => handleHeroImg(src, id);
    const isSelected = id === heroImgId;
    return (
      <AltImage
        key={id}
        src={src}
        alt={altText}
        isSelected={isSelected}
        onClick={setHeroImg}
      />
    );
  };
  
  // begin component's return
  return (
    <ProductImagesWrapper>
      <HeroImage
        src={heroImgSrc ? heroImgSrc : images.edges[0].node.src}
        alt="Product Photo"
      />
      <AltImages>{images.edges.map(image => createAltImage(image))}</AltImages>
    </ProductImagesWrapper>
  );
};

ProductImages.propTypes = {
  images: PropTypes.object,
  heroImgSrc: PropTypes.string,
  heroImgId: PropTypes.string,
  handleHeroImg: PropTypes.func
};

const mapStateToProps = ({
  heroImgSrc,
  heroImgId,
}) => ({
  heroImgSrc,
  heroImgId,
});

const mapDispatchToProps = dispatch => ({
  handleHeroImg: (imageSrc, imageId) =>
    dispatch(CartActionCreators.handleHeroImg(imageSrc, imageId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductImages);
