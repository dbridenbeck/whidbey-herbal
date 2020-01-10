import React from 'react';
import LineItem from './LineItem';
import styled from "styled-components";

const LineItems = (props) => {
  return (
    <div>
      {props.checkout.lineItems.map((lineItem, index) => {
        return (
          <LineItem
            key={lineItem.id}
            lineItem={lineItem}
            index={index}
            createRemoveButton={props.createRemoveButton}
            createUpdateItemButton={props.createUpdateItemButton}
            removeLineItem={props.removeLineItem}
          />
        );
      })}
    </div>
  );
}

export default LineItems;