import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

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
      <p>{lineItem.variants.edges[0].node.price}</p>
      <p>Quantity: {lineItem.quantity}</p>
      {createRemoveButton(lineItem.id, index)}
      {createUpdateItemButton(lineItem, 1, "+")}
      {createUpdateItemButton(lineItem, -1, "-")}
    </div>
  );
};

LineItem.propTypes = {
  lineItem: PropTypes.object,
  index: PropTypes.number,
  createRemoveButton: PropTypes.func,
  createUpdateItemButton: PropTypes.func,
  removeLineItem: PropTypes.func,
}

export default LineItem;