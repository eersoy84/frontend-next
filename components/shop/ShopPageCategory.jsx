// react
import React, { Fragment, useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';
import ProductsView from './ProductsView';
import CategorySidebar from './CategorySidebar';
import theme from '../../data/theme';
import { mergeArrays } from '../../helpers/merger';
import PageHeader from '../shared/PageHeader';

export default function ShopPageCategory(props) {
  const { location } = props;
  const [mergedList, setMergedList] = useState([]);
  const [instantAds, setInstantAds] = useState([]);
  const { adList, instantAdsInfo, categories } = useSelector((state) => ({
    adList: state.ad.adList,
    instantAdsInfo: state.ad.instantAdsInfo,
    categories: state.category.categories,
  }), shallowEqual);

  const dispatch = useDispatch();
  const queryString = require('query-string');

  let breadcrumb = [
    { title: 'Anasayfa', url: '/' },
    { title: 'İlanlar', url: '/kategori' },
  ];

  useEffect(() => {
    setMergedList(mergeArrays(adList, instantAdsInfo));
  }, [adList, instantAdsInfo]);

  const items = (mergedList && mergedList.length > 0) ? mergedList : [];
  const parsed = queryString.parse(location.search);
  const { parentId, categoryId, brandId } = parsed;

  let filteredList = [];
  if (categoryId && brandId) {
    filteredList = items.filter((q) => (q.brandId === parseInt(brandId) && q.categoryId === parseInt(categoryId)));
    const item = filteredList[0];
    breadcrumb = [...breadcrumb,
      ...(item
        ? ([...(item.parentId ? [{ title: `${item.parentId}`, url: `/kategori/?categoryId=${parentId}` }] : []),
          { title: `${item.categoryName}`, url: `/kategori/?categoryId=${categoryId}` },
          { title: `${item.brandName}`, url: `/kategori/?brandId=${brandId}` }])
        : []),
    ];
  } else if (parentId) {
    filteredList = items.filter((q) => (q.parentId || q.categoryId) === parseInt(parentId));
    const item = categories.find((q) => q.id === parseInt(parentId));
    breadcrumb = [...breadcrumb,
      ...(item ? [{ title: `${item.name}`, url: `/kategori/?parentId=${parseInt(parentId)}` }] : []),
    ];
  } else if (categoryId) {
    filteredList = items.filter((q) => (q.categoryId) === parseInt(categoryId));
    const item = filteredList[0];
    breadcrumb = [...breadcrumb,
      ...(item
        ? ([...(item.parentId ? [{ title: `${item.parentName } ${item.parentId }`, url: `/kategori/?categoryId=${categoryId}` }] : []),
          { title: `${item.categoryName}`, url: `/kategori/?categoryId=${categoryId}` }])
        : []),
    ];
  } else if (brandId) {
    filteredList = items.filter((q) => q.brandId === parseInt(brandId));
    const item = filteredList[0];
    breadcrumb = [...breadcrumb,
      ...(item ? [{ title: item && `${item.brandName}`, url: `/kategori/?categoryId=${parseInt(brandId)}` }] : []),
    ];
  } else {
    filteredList = mergedList;
  }

  const sidebar = (
    <div className="shop-layout__sidebar">
      <CategorySidebar offcanvas="mobile" />
    </div>
  );
  return (
    <>
      <Helmet>
        <title>{`İlanlar — ${theme.name}`}</title>
      </Helmet>
      <PageHeader breadcrumb={breadcrumb} />

      <div className="container">
        <div className="shop-layout shop-layout--sidebar--start">
          {sidebar}
          <div className="shop-layout__content">
            <div className="block">
              {(filteredList && filteredList.length > 0)
                ? (
                  <ProductsView
                    mergedList={filteredList}
                    limit={15}
                  />
                )
                : (
                  <div className="block-empty__body">
                    <div className="block-empty__message">Bu kategoride herhangi bir ürün bulunmamaktadır!</div>
                    <div className="block-empty__actions">
                        <Link to="/kategori" className="btn btn-primary btn-sm">Geri Dön</Link>
                      </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
