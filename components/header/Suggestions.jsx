// react
import React from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import Link from 'next/link'
import Image from 'next/image'

// application
import AsyncAction from '../shared/AsyncAction';
import Currency from '../shared/Currency';
import { cartUpdate } from '../../store/cart';

function Suggestions(props) {
  const {
    context,
    className,
    products,
    cartUpdate,
  } = props;
  const rootClasses = classNames(`suggestions suggestions--location--${context}`, className);

  const checkCondition = (product) => {
    const options = setDefaultProperties(product.specs);
    return cartUpdate(product, options, 1);
  };
  const setDefaultProperties = (specs) => {
    const defaultOptions = [];
    specs && specs.map((spec) => {
      const option = {
        optionId: spec.id,
        optionTitle: spec.name,
        valueTitle: spec.value,
      };
      defaultOptions.push(option);
    });
    return defaultOptions;
  };
  const list = (products && products.map((product) => {
    const adName = product && (`${product.categoryName} ${product.brandName} ${product.modelName}`);
    const friendlyUrl = adName && adName.replace(/\s+/g, '-').toLowerCase();
    return (
      <li key={product.adId} className="suggestions__item">
        {product && product.imageUrl && (
          <div className="suggestions__item-image">
            <img src={product.imageUrl} alt="" />
          </div>
        )}
        <div className="suggestions__item-info">
          <Link
            href={`/ilanlar/${product.adId}?seoUrl=${friendlyUrl}`}
          >
            <a className="suggestions__item-name">
              {product.brandName}
              {' '}
              {product.modelName}
            </a>
          </Link>
          <div className="suggestions__item-meta">{product.categoryName}</div>
        </div>
        <div className="suggestions__item-price">
          <span className="text-success">
            <Currency value={product.instantPrice} />
          </span>
        </div>
        {context === 'header' && (
          <div className="suggestions__item-actions">
            <AsyncAction
              action={() => checkCondition(product)}
              render={({ run, loading }) => (
                <button
                  type="button"
                  onClick={run}
                  title="Sepete Ekle"
                  className={classNames('btn btn-primary btn-sm btn-svg-icon', {
                    'btn-loading': loading,
                  })}
                >
                  <Image src="/icons/cart-16.svg" height={16} width={16} />
                </button>
              )}
            />
          </div>
        )}
      </li>
    );
  }));

  return (
    <div className={rootClasses}>
      <ul className="suggestions__list">
        {list}
      </ul>
    </div>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  cartUpdate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Suggestions);
