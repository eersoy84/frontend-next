// react
import React, { Component } from 'react';

// third-party
import PropTypes from 'prop-types';

// data stubs
import BlockProductsCarousel from './BlockProductsCarousel';

export default class BlockTabbedProductsCarousel extends Component {
    timeout;

    constructor(props) {
      super(props);
      const { adList } = this.props;
      this.state = {
        localList: (adList && adList.length > 0) && adList.slice(),
        loading: false,
        groups: [
          // { id: 1, name: 'Tümü', current: true },
          // { id: 2, name: 'Power Tools', current: false },
          // { id: 3, name: 'Hand Tools', current: false },
          // { id: 4, name: 'Plumbing', current: false },
        ],
      };
    }

    componentWillUnmount() {
      clearTimeout(this.timeout);
    }

    handleChangeGroup = (newCurrentGroup) => {
      clearTimeout(this.timeout);

      const { groups } = this.state;
      const currentGroup = groups.find((group) => group.current);

      if (currentGroup && currentGroup.id === newCurrentGroup.id) {
        return;
      }

      this.setState((state) => (
        {
          loading: true,
          groups: state.groups.map((group) => (
            { ...group, current: group.id === newCurrentGroup.id }
          )),
        }
      ));
    };

    render() {
      return (
        <BlockProductsCarousel

          {...this.props}
          {...this.state}
          onGroupClick={this.handleChangeGroup}
        />
      );
    }
}

BlockTabbedProductsCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(['grid-1', 'grid-4', 'grid-4-sm', 'grid-5', 'horizontal']),
  rows: PropTypes.number,
  withSidebar: PropTypes.bool,
};

BlockTabbedProductsCarousel.defaultProps = {
  layout: 'grid-4',
  rows: 1,
  withSidebar: false,
};
