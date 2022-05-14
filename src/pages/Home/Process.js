import React from 'react';
import styled from 'styled-components';
import ComponentWrapper from '../../SharedComponents/ComponentWrapper';
import StyledH2 from '../../SharedComponents/StyledH2';
import { device } from '../../utils/devices';
import ProcessBlock from './ProcessBlock';
import PhotoBumpOut from './PhotoBumpOut';
import harvest from './images/harvest700.jpg';
import handBright from './images/hand-bright700.jpg';
import bottle from './images/bottle700.jpg';
import aging from './images/aging700.jpg';
import distill from './images/distill700.jpg';
import harvestWebp from './images/harvest700.webp';
import handBrightWebp from './images/hand-bright700.webp';
import bottleWebp from './images/bottle700.webp';
import agingWebp from './images/aging700.webp';
import distillWebp from './images/distill700.webp';

const ProcessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProcessDescription = styled.div`
  p {
    position: relative;
    width: 75%;
    margin: -90px auto 10% auto;
    text-align: center;
    font-weight: 300;
    @media ${device.tablet} {
      margin: -90px auto 5% auto;
    }
  }
`;

const processes = [
  {
    processTitle: 'Harvest',
    description:
      'We grow all of our plants ourselves, from sowing the seeds in our greenhouse to growing them tall in the fields. The only exception are our tree ingredients, those come from wind storms that knock down trees and branches for us to collect each winter.',
    img: `${harvest}`,
    webp: `${harvestWebp}`,
    width: '450',
    height: '450',
    alt: 'A watercolor of a fir bow',
  },
  {
    processTitle: 'Prepare',
    description:
      'Plants are hand-trimmed and packed into the still. We distill only those parts of the plant that yield the truest scent, such as the green tips from trees, or the stem and flower from lavender. Plants for non-distilled products are air dried or infused into organic oils or alcohol.',
    img: `${handBright}`,
    webp: `${handBrightWebp}`,
    width: '200',
    height: '225',
    alt: 'A watercolor of a hand pruning a fir bow',
  },
  {
    processTitle: 'Distillation',
    description:
      'Our solar-powered still boils water and pushes steam through plant material to capture the aromatic oils. The steam cools into two products: pure essential oil, and hydrosol, a gentle botanical water. We bottle and sell these whole, or use them as ingredients in our other offerings, such as the scent for our 100% plant-based candles.',
    width: '1550',
    img: `${distill}`,
    webp: `${distillWebp}`,
    height: '549',
    alt: 'A watercolor of a copper still for distilling essential oils',
  },
  {
    processTitle: 'Aging',
    description:
      'We age our oils between 3 to 16 weeks. By aging, the oil can reach its true scent, the exact smell you would get from crushing the fresh plant in your hand.',
    img: `${aging}`,
    webp: `${agingWebp}`,
    width: '1950',
    height: '700',
    alt: 'A watercolor of differnt moon phases',
  },
  {
    processTitle: 'Bottle',
    description:
      'At last, our oils are hand bottled and ready for sale. You can find us at the Bayview Farmers Market, the lovely stores listed below, or on your doorstep by ordering right here on our website. Online orders are sent in 100% recycled, plastic-free, guilt-free packaging and with gratitude from your humble makers.',
    img: `${bottle}`,
    webp: `${bottleWebp}`,
    width: '200',
    height: '225',
    alt: 'A watercolor of a flower',
  },
];

const Process = () => {
  return (
    <ComponentWrapper id='process'>
      <ProcessDescription>
        <StyledH2>The Process</StyledH2>
        <p>
          We grow the plants, we make the goods – <br />
          from start to finish, kind to the earth.
        </p>
      </ProcessDescription>
      <ProcessWrapper>
        {processes.map((process) => (
          <ProcessBlock process={process} key={process.processTitle} />
        ))}
        <PhotoBumpOut />
      </ProcessWrapper>
    </ComponentWrapper>
  );
};

export default Process;
