import styled from 'styled-components';
import { device } from '../../utils/devices';

const LineItemHeadersWrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  font-size: 0.625em;
  font-weight: bold;
  color: #787878;
  border-bottom: 1px solid #c0c0c0;
  .product {
    width: 33.33%;
    margin-left: 16.7%;
  }
  .sixthColumn {
    text-align: center;
    width: 16.7%;
  }
  @media ${device.tablet} {
    font-size: 1em;
  }
`;

const LineItemHeaders = () => (
  <LineItemHeadersWrapper>
    <div className="product">Product</div>
    <div className="sixthColumn">Price</div>
    <div className="sixthColumn">Quantity</div>
    <div className="sixthColumn">Total</div>
  </LineItemHeadersWrapper>
);

export default LineItemHeaders;
