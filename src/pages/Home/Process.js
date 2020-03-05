import React from 'react';
import styled from "styled-components";
import ComponentWrapper from "../../SharedComponents/ComponentWrapper";
import StyledH2 from "../../SharedComponents/StyledH2";
import { device } from "../../utils/devices";
import ProcessBlock from './ProcessBlock';
import PhotoBumpOut from './PhotoBumpOut';
import harvest from './images/harvest700.jpg';
import handBright from "./images/hand-bright700.jpg";
import bottle from "./images/bottle700.jpg";
import aging from "./images/aging700.jpg";
import distill from "./images/distill700.jpg";
import harvestWebp from './images/harvest700.webp';
import handBrightWebp from "./images/hand-bright700.webp";
import bottleWebp from "./images/bottle700.webp";
import agingWebp from "./images/aging700.webp";
import distillWebp from "./images/distill700.webp";

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
      "Our harvest methods vary for each oil. We forage for downed tree bows and use the lavender from our farm.",
    img: `${harvest}`,
    webp: `${harvestWebp}`,
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
    height: "549",
    alt: "A watercolor of a copper still for distilling essential oils"
  },
  {
    processTitle: "Aging",
    description:
      "Oils are 'dried' using epsom salt, and aged between 6 and 12 weeks depending on the plant.",
    img: `${aging}`,
    webp: `${agingWebp}`,
    width: "1950",
    height: "700",
    alt: "A watercolor of differnt moon phases"
  },
  {
    processTitle: "Bottle",
    description: "We then hand bottle the oils and bring them to market!",
    img: `${bottle}`,
    webp: `${bottleWebp}`,
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