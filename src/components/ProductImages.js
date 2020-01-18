import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { device } from "../utils/devices";

import * as CartActionCreators from "../state/actions/cart";
import styled from "styled-components";

// Begin Styled Components
const ProductImagesWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  @media ${device.tablet} {
    width: 45%;
  }
  @media ${device.laptop} {
    width: 35%;
    margin: 0 7.5%;
  }
`;

const HeroImage = styled.img`
  display: block;
  margin-bottom: 30px;
  width: 100%;
  height: auto;
  border: 4px solid #e3be42;
  border-radius: 10px;
`;

const AltImages = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  height: auto;
  width: 100%;
  margin: 0 auto;
`;

const AltImage = styled.img`
  display: block;
  width: 120px;
  height: 120px;
  align-self: center;
  margin: 0 10px;
  border: ${props =>
    props.isSelected ? "2px solid #e3be42" : "2px solid white"};
  border-radius: 10px;
  :first-child {
    ${props => (props.isSelected ? "2px solid #e3be42" : "2px solid white")};
  }
  :hover {
    border: ${props =>
      props.isSelected ? "2px solid #e3be42" : "2px solid #DADADA"};
  }
`;

// begin component
const ProductImages = ({
  selectedProduct,
  heroImgSrc,
  heroImgId,
  handleHeroImg,
}) => {

  // when clicked, AltImage updates state and sets heroImg's src to AltImage
  const createAltImage = image => {
    const setHeroImg = () => handleHeroImg(image.node.src, image.node.id);
    const isSelected = image.node.id == heroImgId;
    return (
      <AltImage
        key={image.node.id}
        src={image.node.src}
        alt={image.node.altText}
        isSelected={isSelected}
        onClick={setHeroImg}
      />
    );
  };
  
  // begin component's return
  return (
    <ProductImagesWrapper>
      <HeroImage
        src={
          heroImgSrc ? heroImgSrc : selectedProduct.images.edges[0].node.src
        }
        alt="Product Photo"
      />
      <AltImages>
        {selectedProduct.images.edges.map(image => createAltImage(image))}
      </AltImages>
    </ProductImagesWrapper>
  );
};

ProductImages.propTypes = {
  selectedProduct: PropTypes.object,
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
