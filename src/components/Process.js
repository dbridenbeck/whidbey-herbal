import React from 'react';
import styled from "styled-components";
import ProcessBlock from './ProcessBlock';
import { device } from "../utils/devices";
import { laptopMargins, tabletMargins, mobileMargins, fluidH1 } from "../utils/responsiveSCSS";
import harvestLeft from '../images/harvestLeft.jpg';
import harvestRight from '../images/harvestRight.jpg';
import prepareLeft from '../images/prepareLeft.jpg';
import prepareRight from '../images/prepareRight.jpg';
import distill from '../images/distill.jpg';
import aging from '../images/aging.jpg';
import bottleLeft from '../images/bottleLeft.jpg';
import bottleRight from '../images/bottleRight.jpg';

// TODO: 
// 3) look into using styled components to change height of processContainer and position of ProcessTitle and Description text depending on if imgFlanked is true or not

const ProcessesWrapper = styled.div`
  position: relative;
  overflow: auto;
  width: 100%;
  max-width: 1000px;
  ${mobileMargins};
  @media ${device.tablet} {
    ${tabletMargins};
  }
  @media ${device.laptop} {
    ${laptopMargins};
  }
`;

const ContainerTitle = styled.h1`
  height: 50px;
  margin: 20px auto;
  font-weight: bold;
  ${fluidH1}
  text-align: center;
  letter-spacing: 0.01em;
  color: #787878;
  @media ${device.laptop} {
    margin-bottom: 80px;
  }
`;

const Process = () => {

  const processes = [
    {
      processTitle: "HARVEST",
      description:
        "Our harvest methods vary for each oil. We forage for downed fir bows and use the lavendar from our farm.",
      imgFlanked: true,
      imgLeft: `${harvestLeft}`, 
      imgRight: `${harvestRight}`, 
    },
    {
      processTitle: "PREPARE",
      description:
      "Plants are trimmed as needed and packed into the still for distillation.",
      imgFlanked: true, 
      imgLeft: `${prepareLeft}`, 
      imgRight: `${prepareRight}`,
    },
    {
      processTitle: "DISTILL",
      description:
      "The still boils water and pushes steam through the plant material to remove the aromatic oils. The steam is then recondensed into essential oil which is tapped off for aging.",
      imgFlanked: false, 
      fullWidthImg: `${distill}`,
    },
    {
      processTitle: "AGING",
      description:
      "Oils are 'dried' using epsom salt, and aged between 6 and 12 weeks depending on the plant.",
      imgFlanked: false, 
      fullWidthImg: `${aging}`,
    },
    {
      processTitle: "BOTTLE",
      description: "We then hand bottle the oils and bring them to market!",
      imgFlanked: true, 
      imgLeft: `${bottleLeft}`, 
      imgRight: `${bottleRight}`,
    }
  ];

  return (
    <ProcessesWrapper id="process">
      <ContainerTitle>Our Process</ContainerTitle>
      {processes.map(process => (
        <ProcessBlock 
          process={process} 
          key={process.processTitle}
        />
      ))}
    </ProcessesWrapper>
  );
}

export default Process;