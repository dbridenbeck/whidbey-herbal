import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { device } from '../../utils/devices';

const ProcessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: relative;
  height: 375px;
  width: 60%;
  /* use margins to stagger process containers vertically 
    and horizontally center the two columns */
  margin: 20% 5% 5% 5%;
  /* set first child to have no top margin */
  :first-child {
    margin-top: 0;
  }
  /* stagger horizontal positioning of process blocks */
  :nth-child(even) {
    align-self: flex-end;
  }
  @media ${device.tablet} {
    width: 40%;
    height: 500px;
    margin: -5% 5% 0 5%;
  }
  @media ${device.laptop} {
    height: 500px;
    margin: -10% 5% 0 5%;
  }
  @media ${device.largeScreen} {
    height: 500px;
    margin: 5% 5% 0 5%;
    :first-child {
      margin-top: 5%;
    }
  }
`;

const Info = styled.div`
  position: relative;
  margin: 0;
  .title {
    margin: ${(props) => (props.fullWidth ? '0 0 32px 0' : '48px 0 32px 0')};
    padding: 0;
    font-family: 'Domine', sans-serif;
    font-weight: normal;
    font-style: normal;
    font-size: 1.5rem;
    text-align: center;
    color: #787878;
    @media ${device.tablet} {
      font-size: 2rem;
    }
    @media ${device.laptop} {
      font-size: 2.5rem;
    }
  }
  .description {
    margin: 0 auto;
    padding: 0;
    font-size: 1rem;
    line-height: 1.375em;
    font-weight: 300;
    text-align: center;
    font-style: normal;
    letter-spacing: 0.01em;
    color: #787878;
    @media ${device.tablet} {
      font-size: 1.25rem;
    }
    @media ${device.laptop} {
      font-size: 1.5rem;
    }
  }
`;

const StyledPicture = styled.picture`
  img {
    display: block;
    margin: 0 auto;
    /* handle width for images that are landscape */
    width: 100%;
    height: auto;
  }
`;

const ProcessBlock = ({
  process: { processTitle, description, img, webp, width, height, alt },
}) => {
  return (
    <ProcessContainer>
      <StyledPicture>
        <source srcSet={`${webp}`} type='image/webp' />
        <source srcSet={`${img}`} type='image/jpeg' />
        <img
          src={`${img}`}
          width={`${width}`}
          height={`${height}`}
          alt={`${alt}`}
        />
      </StyledPicture>
      <Info>
        <h6 className='title'>{processTitle}</h6>
        <p className='description'>{description}</p>
      </Info>
    </ProcessContainer>
  );
};

ProcessBlock.propTypes = {
  fullWidth: PropTypes.bool,
  processTitle: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
};

export default ProcessBlock;
