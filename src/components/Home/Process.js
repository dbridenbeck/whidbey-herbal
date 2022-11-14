import styled from 'styled-components';
import ComponentWrapper from '../../SharedComponents/ComponentWrapper';
import StyledH2 from '../../SharedComponents/StyledH2';
import { device } from '../../utils/devices';
import ProcessBlock from './ProcessBlock';
import PhotoBumpOut from './PhotoBumpOut';
import harvest from '../../../public/harvest700.jpg';
import handBright from '../../../public/hand-bright700.jpg';
import bottle from '../../../public/bottle700.jpg';
import aging from '../../../public/aging700.jpg';
import distill from '../../../public/distill700.jpg';

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
      'We choose the most sustainable option for each plant –either wild harvest or farm grown. Our tree oils come from branches knocked down by wind.',
    img: harvest,

    width: '450',
    height: '450',
    alt: 'A watercolor of a fir bow',
  },
  {
    processTitle: 'Prepare',
    description:
      'Plants are hand-trimmed and packed into the still. We only distill the parts of the plant that yield the truest scent, such as the greenery from trees, or the stem and flower from lavender.',
    img: handBright,

    width: '200',
    height: '225',
    alt: 'A watercolor of a hand pruning a fir bow',
  },
  {
    processTitle: 'Distillation',
    description:
      'Our 100% solar-powered still boils water and pushes steam through the plant material to capture the aromatic oils. The steam is recondensed into two products: pure essential oil, and hydrosol, a gentle botanical water.',
    width: '1550',
    img: distill,

    height: '549',
    alt: 'A watercolor of a copper still for distilling essential oils',
  },
  {
    processTitle: 'Aging',
    description:
      'Unlike many mass-market oils, we age our oils between 3 to 16 weeks. By aging, the oil can reach its true scent, the exact smell you would get from crushing the fresh plant in your hand.',
    img: aging,

    width: '1950',
    height: '700',
    alt: 'A watercolor of differnt moon phases',
  },
  {
    processTitle: 'Bottle',
    description:
      'At last, our oils are hand bottled and ready for sale. You can find us at the Bayview Farmers Market, the lovely stores listed below, or on your doorstep. Online orders are sent in 100% recycled, plastic-free, guilt-free packaging.',
    img: bottle,

    width: '200',
    height: '225',
    alt: 'A watercolor of a flower',
  },
];

const Process = () => {
  return (
    <ComponentWrapper id="process">
      <ProcessDescription>
        <StyledH2>The Process</StyledH2>
        <p>From start to finish, oils that are good to mother earth.</p>
      </ProcessDescription>
      <ProcessWrapper>
        {processes.map((process) => (
          <ProcessBlock processInfo={process} key={process.processTitle} />
        ))}
        <PhotoBumpOut />
      </ProcessWrapper>
    </ComponentWrapper>
  );
};

export default Process;
