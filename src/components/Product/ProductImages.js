import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { device } from '../../utils/devices';
import * as CartActionCreators from '../../state/actions/cart';
import styled from 'styled-components';

// Begin Styled Components
const ProductImagesWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 410px;
  margin: 0 auto;
  @media ${device.tablet} {
    margin: 0;
    width: 45%;
  }
  @media ${device.laptop} {
    width: 35%;
  }
`;

const HeroImage = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  width: 285px;
  height: 320px;
  /* border: 4px solid #e3be42; */
  border-radius: 10px;
`;

const AltImages = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  height: auto;
  max-width: 410px;
  margin: 0 auto;
`;

const AltImage = styled.div`
  display: block;
  position: relative;
  width: 25%;
  max-width: 102px;
  height: 72px;
  align-self: center;
  margin: 10px;
  overflow: hidden;
  border: ${(props) =>
    props.isSelected ? '2px solid #e3be42' : '2px solid #DADADA'};
  border-radius: 10px;
  :hover {
    border: ${(props) =>
      props.isSelected ? '2px solid #e3be42' : '2px solid #787878'};
  }
`;

// begin component
const ProductImages = ({ images, heroImgSrc, handleHeroImg }) => {
  // when clicked, AltImage updates state and sets heroImg's src to AltImage
  const createAltImage = (image) => {
    const {
      node: { url, altText },
    } = image;
    const setHeroImg = () => handleHeroImg(url);
    const isSelected = url === heroImgSrc;
    return (
      <AltImage key={url} isSelected={isSelected} onClick={setHeroImg}>
        <Image
          src={url}
          alt={altText}
          layout="fill"
          objectFit="contain"
          sizes="102px"
          priority
        />
      </AltImage>
    );
  };

  // begin component's return
  return (
    <ProductImagesWrapper>
      <HeroImage>
        <Image
          layout="fill"
          src={heroImgSrc ? heroImgSrc : images.edges[0].node.url}
          alt="Product Photo"
          objectFit="contain"
          sizes="285px"
          priority
        />
      </HeroImage>
      <AltImages>
        {images.edges.map((image) => createAltImage(image))}
      </AltImages>
    </ProductImagesWrapper>
  );
};

ProductImages.propTypes = {
  images: PropTypes.object,
  heroImgSrc: PropTypes.string,
  heroImgId: PropTypes.string,
  handleHeroImg: PropTypes.func,
};

const mapStateToProps = ({ heroImgSrc }) => ({
  heroImgSrc,
});

const mapDispatchToProps = (dispatch) => ({
  handleHeroImg: (imageSrc, imageId) =>
    dispatch(CartActionCreators.handleHeroImg(imageSrc, imageId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductImages);
