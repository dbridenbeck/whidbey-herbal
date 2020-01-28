import React from 'react';
import Wrapper from "../../SharedComponents/ComponentWrapper";
import StyledH1 from "../../SharedComponents/StyledH1";
import ProcessBlock from './ProcessBlock';

import harvestLeft from './images/harvestLeft.jpg';
import harvestRight from "./images/harvestRight.jpg";
import prepareLeft from "./images/prepareLeft.jpg";
import prepareRight from "./images/prepareRight.jpg";
import distill from "./images/distill.jpg";
import aging from "./images/aging.jpg";
import bottleLeft from "./images/bottleLeft.jpg";
import bottleRight from "./images/bottleRight.jpg";

const processes = [
  {
    processTitle: "HARVEST",
    description:
      "Our harvest methods vary for each oil. We forage for downed fir bows and use the lavendar from our farm.",
    imgFlanked: true,
    imgLeft: `${harvestLeft}`, 
    imgRight: `${harvestRight}`, 
    width: "450",
    height: "450",
    alt: "A watercolor of a fir bow"
  },
  {
    processTitle: "PREPARE",
    description:
    "Plants are trimmed as needed and packed into the still for distillation.",
    imgFlanked: true, 
    imgLeft: `${prepareLeft}`, 
    imgRight: `${prepareRight}`,
    width: "200",
    height: "225",
    alt: "A watercolor of a hand pruning a fir bow"
  },
  {
    processTitle: "DISTILL",
    description:
    "The still boils water and pushes steam through the plant material to remove the aromatic oils. The steam is then recondensed into essential oil which is tapped off for aging.",
    imgFlanked: false, 
    fullWidthImg: `${distill}`,
    width: "1550",
    height: "549",
    alt: "A watercolor of a copper still for distilling essential oils"
  },
  {
    processTitle: "AGING",
    description:
    "Oils are 'dried' using epsom salt, and aged between 6 and 12 weeks depending on the plant.",
    imgFlanked: false, 
    fullWidthImg: `${aging}`,
    width: "1950",
    height: "700",
    alt: "A watercolor of differnt moon phases"
  },
  {
    processTitle: "BOTTLE",
    description: "We then hand bottle the oils and bring them to market!",
    imgFlanked: true, 
    imgLeft: `${bottleLeft}`, 
    imgRight: `${bottleRight}`,
    width: "200",
    height: "225",
    alt: "A watercolor of a flower"
  }
];

const Process = () => {
  return (
    <Wrapper id="process" maxWidth={"800px"} positionRelative={true}>
      <StyledH1 colorIsGrey={true} centered={true}>
        {" "}
        Our Process{" "}
      </StyledH1>
      {processes.map(process => (
        <ProcessBlock process={process} key={process.processTitle} />
      ))}
    </Wrapper>
  );
}

export default Process;