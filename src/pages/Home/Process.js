import React from 'react';
import styled from "styled-components";
import ComponentWrapper from "../../SharedComponents/ComponentWrapper";
import StyledH2 from "../../SharedComponents/StyledH2";
import { device } from "../../utils/devices";
import ProcessBlock from './ProcessBlock';
import PhotoBumpOut from './PhotoBumpOut';
import harvestLeft from './images/harvestLeft.jpg';
import handBright from "./images/hand-bright.jpg";
import bottleRight from "./images/bottleRight.jpg";
import aging from "./images/aging.jpg";
import distill from "./images/distill.jpg";
import harvestLeftWebp from './images/harvestLeft.webp';
import handBrightWebp from "./images/hand-bright.webp";
import bottleRightWebp from "./images/bottleRight.webp";
import agingWebp from "./images/aging.webp";
import distillWebp from "./images/distill.webp";

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
    processTitle: "Harvest",
    description:
      "Our harvest methods vary for each oil. We forage for downed fir bows and use the lavendar from our farm.",
    img: `${harvestLeft}`,
    webp: `${harvestLeftWebp}`,
    fullWidth: false,
    width: "450",
    height: "450",
    alt: "A watercolor of a fir bow"
  },
  {
    processTitle: "Prepare",
    description:
      "Plants are trimmed as needed and packed into the still for distillation.",
    img: `${handBright}`,
    webp: `${handBrightWebp}`,
    fullWidth: true,
    width: "200",
    height: "225",
    alt: "A watercolor of a hand pruning a fir bow"
  },
  {
    processTitle: "Distill",
    description:
      "The still boils water and pushes steam through the plant material to remove the aromatic oils. The steam is then recondensed into essential oil which is tapped off for aging.",
    width: "1550",
    img: `${distill}`,
    webp: `${distillWebp}`,
    fullWidth: true,
    height: "549",
    alt: "A watercolor of a copper still for distilling essential oils"
  },
  {
    processTitle: "Aging",
    description:
      "Oils are 'dried' using epsom salt, and aged between 6 and 12 weeks depending on the plant.",
    img: `${aging}`,
    webp: `${agingWebp}`,
    fullWidth: true,
    width: "1950",
    height: "700",
    alt: "A watercolor of differnt moon phases"
  },
  {
    processTitle: "Bottle",
    description: "We then hand bottle the oils and bring them to market!",
    img: `${bottleRight}`,
    webp: `${bottleRightWebp}`,
    fullWidth: false,
    width: "200",
    height: "225",
    alt: "A watercolor of a flower"
  }
];

const Process = () => {
  return (
    <ComponentWrapper id="process">
      <ProcessDescription>
        <StyledH2>The Process</StyledH2>
        <p>From seed to bottle, solar-powered and in tune with nature.</p>
      </ProcessDescription>
      <ProcessWrapper>
        {processes.map(process => (
          <ProcessBlock process={process} key={process.processTitle} />
        ))}
        <PhotoBumpOut />
      </ProcessWrapper>
    </ComponentWrapper>
  );
}

export default Process;