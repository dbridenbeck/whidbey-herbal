import React from 'react';
import styled from "styled-components";

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
  color: #787878;
`;

const QuantityButton = () => {

  return (
    <div>
      <Quantity onChange="">
        <label>
          Quantity:
          <StyledInput type="text" value="1" onChange="" />
        </label>
      </Quantity>
    </div>
  );
};

export default QuantityButton;