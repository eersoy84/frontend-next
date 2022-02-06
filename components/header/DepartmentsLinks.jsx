// react
import React from 'react';

// third-party
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Image from 'next/image'

// application
import Megamenu2 from './SubCategory';
import Menu from './Menu';
import SubCategory from './SubCategory';
import Brands from './Brands';

// data stubs
// import departments from '../../data/headerDepartments';

function DepartmentsLinks({ categories }) {
  const linksList = categories && categories.map((category) => {
    let arrow = null;
    let subCategories = null;
    let brands = null;
    let itemClass = '';

    if (category.subCategories && category.subCategories.length > 0) {
      arrow = <Image src="/icons/arrow-rounded-right-6x9.svg" className="departments__link-arrow" height={10} width={10} />

      itemClass = 'departments__item--menu';
      subCategories = (
        <div className={`departments__megamenu departments__megamenu--${category.subCategories.length < 6 ? 'sm' : 'nl'}`}>
          <SubCategory items={category.subCategories} location="department" />
        </div>
      );
    } else if (category.brands && category.brands.length > 0) {
      arrow = <Image src="/icons/arrow-rounded-right-6x9.svg" className="departments__link-arrow" height={10} width={10} />
      itemClass = 'departments__item--menu';

      brands = (
        <div className={`departments__megamenu departments__megamenu--${category.brands.length < 6 ? 'sm' : 'nl'}`}>
          <Brands items={category.brands} categoryId={category.id} location="department" />
        </div>
      );
    }
    return (
      <li key={category.id} className={`departments__item ${itemClass}`}>
        <Link to={`/kategori?parentId=${category.id}`}>
          {category.name}
          {arrow}
        </Link>
        {subCategories}
        {brands}
      </li>
    );
  });

  return (
    <ul className="departments__links">
      {linksList}
    </ul>
  );
}
DepartmentsLinks.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default DepartmentsLinks;
