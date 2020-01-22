import React from 'react';
import LineItem from './LineItem';
import PropTypes from "prop-types";

const LineItems = ({items, createRemoveButton, createUpdateItemButton, removeLineItem}) => {
  return (
    <div>
      {items.map((lineItem, index) => {
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