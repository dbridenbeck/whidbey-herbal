import React from 'react';
import LineItem from './LineItem';
import styled from "styled-components";
import PropTypes from "prop-types";

const LineItems = ({checkout, createRemoveButton, createUpdateItemButton, removeLineItem}) => {
  return (
    <div>
      {checkout.lineItems.map((lineItem, index) => {
        return (
          <LineItem
            key={lineItem.id}
            lineItem={lineItem}
            index={index}
            createRemoveButton={createRemoveButton}
            createUpdateItemButton={createUpdateItemButton}
            removeLineItem={removeLineItem}
          />
        );
      })}
    </div>
  );
}

LineItems.propTypes = {
  checkout: PropTypes.object,
  createRemoveButton: PropTypes.func,
  createUpdaetItemButton: PropTypes.func,
  removeLineItem: PropTypes.func,
}

export default LineItems;