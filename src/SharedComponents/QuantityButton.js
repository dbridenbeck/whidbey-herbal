import styled from 'styled-components';
import ExceededMaxQuantityWarning from './ExceededMaxQuantityWarning';

const QuantityWrapper = styled.div`
  align-self: flex-start;
  height: 50px;
  padding: 1% 0 5px 0;
`;

const Quantity = styled.form`
  font-size: 1em;
  flex: 1;
  color: #787878;
`;

const StyledInput = styled.input`
  margin: 0 auto;
  display: block;
  max-width: 45px;
  border: 1px solid #787878;
  border-radius: 10px;
  text-align: center;
  font-size: 1em;
  color: rgba(120, 120, 120, 0.8);
  :focus {
    outline-width: 0;
  }
`;

const maxInput = (event, maxQuantity) =>
  event.target.value > maxQuantity ? maxQuantity : event.target.value;

const QuantityButton = ({
  quantity,
  selectedProduct,
  shouldAddQuantities,
  labelTitle,
  onChangeFunction,
  maxQuantity,
}) => {
  return (
    <QuantityWrapper>
      <Quantity>
        {labelTitle && <label id={labelTitle}>{labelTitle}</label>}
        <StyledInput
          htmlFor={labelTitle}
          type="number"
          value={parseInt(quantity)}
          min="1"
          max={maxQuantity}
          onChange={(event) => {
            onChangeFunction(
              maxInput(event, maxQuantity),
              shouldAddQuantities,
              selectedProduct
            );
          }}
        />
      </Quantity>
      <ExceededMaxQuantityWarning
        buttonQuantity={quantity}
        maxQuantity={maxQuantity}
      >
        Limit {maxQuantity} per order.
      </ExceededMaxQuantityWarning>
    </QuantityWrapper>
  );
};

export default QuantityButton;
