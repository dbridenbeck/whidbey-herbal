import LineItem from './LineItem';
import PropTypes from 'prop-types';

const LineItems = ({ items, createRemoveButton, createUpdateItemButton }) => {
  return (
    <div>
      {items.map((lineItem, index) => {
        return (
          <LineItem
            key={lineItem.handle}
            lineItem={lineItem}
            index={index}
            createRemoveButton={createRemoveButton}
            createUpdateItemButton={createUpdateItemButton}
          />
        );
      })}
    </div>
  );
};

LineItems.propTypes = {
  checkout: PropTypes.object,
  createRemoveButton: PropTypes.func,
  createUpdaetItemButton: PropTypes.func,
  removeLineItem: PropTypes.func,
};

export default LineItems;
