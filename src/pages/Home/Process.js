import React from 'react';
import styled from "styled-components";
import ComponentWrapper from "../../SharedComponents/ComponentWrapper";
import StyledH2 from "../../SharedComponents/StyledH2";
import ProcessBlock from './ProcessBlock';
import harvestLeft from './images/harvestLeft.jpg';
import prepareLeft from "./images/prepareLeft.jpg";
import aging from "./images/aging.jpg";

  const ProcessWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    width: 100%;
    border: 1px solid red;
  `;

const processes = [
  {
    processTitle: "Harvest",
    description:
      "Our harvest methods vary for each oil. We forage for downed fir bows and use the lavendar from our farm.",
    img: `${harvestLeft}`, 
    width: "450",
    height: "450",
    alt: "A watercolor of a fir bow"
  },
  {
    processTitle: "Prepare",
    description:
    "Plants are trimmed as needed and packed into the still for distillation.",
    img: `${prepareLeft}`, 
    width: "200",
    height: "225",
    alt: "A watercolor of a hand pruning a fir bow"
  },
  {
    processTitle: "Distill",
    description:
    "The still boils water and pushes steam through the plant material to remove the aromatic oils. The steam is then recondensed into essential oil which is tapped off for aging.",
    width: "1550",
    height: "549",
    alt: "A watercolor of a copper still for distilling essential oils"
  },
  {
    processTitle: "Aging",
    description:
    "Oils are 'dried' using epsom salt, and aged between 6 and 12 weeks depending on the plant.",
    img: `${aging}`,
    width: "1950",
    height: "700",
    alt: "A watercolor of differnt moon phases"
  },
  {
    processTitle: "Bottle",
    description: "We then hand bottle the oils and bring them to market!",
    img: `${aging}`,
    width: "200",
    height: "225",
    alt: "A watercolor of a flower"
  }
];

const Process = () => {
  return (
    <ComponentWrapper id="process">
      <StyledH2>
        
        Our Process
      </StyledH2>
      <ProcessWrapper>
        {processes.map(process => (
          <ProcessBlock process={process} key={process.processTitle} />
        ))}
      </ProcessWrapper>
    </ComponentWrapper>
  );
}

export default Process;