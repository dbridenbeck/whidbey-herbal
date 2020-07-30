import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";

const SubtotalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  .subtotalContainer {
    display: block;
    margin: 40px 20px 0 0;
    .subtotal {
      height: 25px;
      margin: 0;
      padding: 0;
      color: #787878;
    }
    .shippingInfo {
      font-size: 0.75em;
      color: #787878;
      margin: 0;
      padding: 0;
    }
  }
`;

const SubtotalSection = ({ calculatedCartSubtotal, createCheckoutButton }) => (
  <SubtotalWrapper>
    <div className="subtotalContainer">
      <p className="subtotal">
        {" "}
        <strong>Subtotal:</strong> {calculatedCartSubtotal}{" "}
      </p>
      <p className="shippingInfo">Shipping & taxes calculated at checkout</p>
      {createCheckoutButton()}
    </div>
  </SubtotalWrapper>
);          
SubtotalSection.propTypes = {
  visibleCartSubtotal: PropTypes.number,
  createCheckoutButton: PropTypes.func
}

export default SubtotalSection;