import React from 'react';
import { useQuery, ApolloConsumer } from '@apollo/client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { device } from '../../utils/devices';
import { GET_CHECKOUT } from '../../queries';

import * as CartActionCreators from '../../state/actions/cart';
import styled from 'styled-components';
import Header from './Header';

const MasterWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0px auto 0px auto;
  overflow: hidden;
  opacity: ${(props) => (props.isLoading ? '0' : '1')};
  transition: opacity 500ms ease-in-out;
  transition-delay: 200ms;
  /* Media screen keeps WelcomeSection's img 100% height on bigger screens */
  @media ${device.laptop} {
    max-width: 100vw;
  }
`;

const Layout = ({ children, clearCheckoutInState, checkoutId }) => {
  const { data: checkoutData, loading } = useQuery(GET_CHECKOUT, {
    variables: { id: checkoutId },
  });

  return (
    <ApolloConsumer>
      {() => {
        // if checkout exists, clear checkout in state if checkout was completed
        if (checkoutData?.node?.completedAt) {
          clearCheckoutInState();
        }

        return (
          !loading && (
            <MasterWrapper id="MasterWrapper">
              <Header />
              {children}
            </MasterWrapper>
          )
        );
      }}
    </ApolloConsumer>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  checkoutId: PropTypes.string,
  clearCheckoutInState: PropTypes.func,
};

const mapStateToProps = ({ checkout: { checkoutId } }) => ({
  checkoutId,
});

const mapDispatchToProps = (dispatch) => ({
  clearCheckoutInState: () =>
    dispatch(CartActionCreators.clearCheckoutInState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Layout));
