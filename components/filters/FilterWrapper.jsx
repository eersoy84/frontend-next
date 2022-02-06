import React, { Component } from 'react';
import FilterCategoriesDeneme from './FilterCategoriesDeneme';
import FilterCheckboxDeneme from './FilterCheckboxDeneme';
import FilterRadioDeneme from './FilterRadioDeneme';

class FilterWrapper extends Component {
    state = { categoryId: 0, items: [] }

    handleClick = (categoryId, items) => {
      this.setState({ categoryId, items });
    }

    render() {
      const { categories, offcanvas } = this.props;
      const { categoryId, items } = this.state;
      return (
        <div>
          <FilterCategoriesDeneme items={categories} onItemClick={this.handleClick} />
          {((items && items.length > 0) && <FilterRadioDeneme items={items} categoryId={categoryId} />) || null}

        </div>
      );
    }
}
export default FilterWrapper;
