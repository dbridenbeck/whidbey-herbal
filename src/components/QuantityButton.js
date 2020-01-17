import React from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import * as CartActionCreators from "../state/actions/cart";

const Quantity = styled.form`
  font-size: 18px;
  color: #787878;
`;

const StyledInput = styled.input`
  width:  50px;
  height: 30px;
  margin-left: 10px;
  border: 1px solid #787878;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  color: rgba(120, 120, 120, .8);
  :focus {
    outline-width: 0;
  }
`;

const QuantityButton = ({updateQuantityButton, quantityButtonAmount}) => {
console.log("quantityButtonAmount is: ", quantityButtonAmount );
  return (
    <div>
      <Quantity>
        <label>
          Quantity:
          {/* ugh - gotta come back to this. need to get value to be the quantity that goes to updateQuantityButton! */}
          <StyledInput type="text" value={quantityButtonAmount} onChange={(event) => updateQuantityButton(event.target.value)} />
        </label>
      </Quantity>
    </div>
  );
};

const mapStatetoProps = ({quantityButtonAmount}) => ({
  quantityButtonAmount
})

const mapDispatchtoProps = (dispatch) => ({
  updateQuantityButton: (quantity) => dispatch(CartActionCreators.updateQuantityButton(quantity)),
})

export default connect(mapStatetoProps, mapDispatchtoProps)(QuantityButton);