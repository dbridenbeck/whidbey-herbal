import React from 'react';
import styled from "styled-components";

const LineItem = ({
  lineItem,
  index,
  createRemoveButton,
  createUpdateItemButton,
  removeLineItem
}) => {
  // if line item's quantity drops to zero, remove it from redux
  if (lineItem.quantity === 0) {
    removeLineItem(lineItem.id, index);
  }

  return (
    <div key={lineItem.id}>
      <h3>{lineItem.title}</h3>
      <p>{lineItem.description}</p>
      <p>{lineItem.variants[0].price}</p>
      <p>Quantity: {lineItem.quantity}</p>
      {createRemoveButton(lineItem.id, index)}
      {createUpdateItemButton(lineItem, 1, "+")}
      {createUpdateItemButton(lineItem, -1, "-")}
    </div>
  );
};

export default LineItem;