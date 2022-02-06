// react
import { useState } from 'react';
import Image from 'next/image'

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import { Check9x7Svg } from '../../svg';

function FilterCheckboxDeneme(props) {
  const { items, name, offcanvas } = props;
  const [brandId, setBrandId] = useState(0);

  const handleCheckbox = (id) => {
    setBrandId(id);
    console.log('checkbox', id);
  };
  const handleButtonClick = (value) => {
    console.log('button', value);
  };
  const itemsList = items.map((item) => {
    let count;
    let modelCount;
    if (item.models && item.models.length > 0) {
      modelCount = item.models.length;
      count = <span className="filter-list__counter">{modelCount}</span>;
    }

    return (
      <label
        key={item.id}
        className={classNames('filter-list__item', {
          'filter-list__item--disabled': !(modelCount > 0),
        })}
      >
        <span className="filter-list__input input-check">
          <span className="input-check__body">
            <input
              className="input-check__input"
              type="checkbox"
              disabled={!(modelCount > 0)}
              onChange={() => handleCheckbox(item.id)}
            />
            <span className="input-check__box" />
            <Image src="/icons/check-9x7.svg" className='input-check__icon' height={9} width={7} />
            {/* <Check9x7Svg className="input-check__icon" /> */}
          </span>
        </span>
        <span className="filter-list__title">{item.name}</span>
        {count}
      </label>
    );
  });

  const classes = classNames('widget-filters widget', {
    'widget-filters--offcanvas--always': offcanvas === 'always',
    'widget-filters--offcanvas--mobile': offcanvas === 'mobile',
  });
  return (
    <div className={classes}>
      <h4 className="widget-filters__title widget__title">Markalar</h4>

      <div className="widget-filters__list">
        <div className="filter-list">
          {itemsList}
        </div>
      </div>

      <div className="widget-filters__actions d-flex">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => handleButtonClick()}
        >
          Ara
        </button>
        <button type="button" className="btn btn-secondary btn-sm ml-2">Resetle</button>
      </div>
    </div>

  );
}

FilterCheckboxDeneme.propTypes = {
  items: PropTypes.array,
  name: PropTypes.string,
};

export default FilterCheckboxDeneme;
