import PropTypes from 'prop-types';
import Link from 'next/link'
import Image from 'next/image'
import UseHasMounted from '../../hooks/useHasMounted';
import { ArrowRoundedRight6x9Svg } from '../../svg';

function PageHeader(props) {
  let { header, breadcrumb } = props;

  if (header) {
    header = (
      <div className="page-header__title">
        <h1>{header}</h1>
      </div>
    );
  }

  if (breadcrumb.length > 0) {
    const lastIndex = breadcrumb.length - 1;

    breadcrumb = breadcrumb.map((item, index) => {
      let link;

      if (lastIndex === index) {
        link = <li key={index} className="breadcrumb-item active" aria-current="page">{item.title}</li>;
      } else {
        link = (
          <li key={index} className="breadcrumb-item">
            <Link href={item.url}>
              <a>
                {item.title}
              </a>
            </Link>
            <ArrowRoundedRight6x9Svg  className="breadcrumb-arrow"/>
          </li>
        );
      }

      return link;
    });

    breadcrumb = (
      <div className="page-header__breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {breadcrumb}
          </ol>
        </nav>
      </div>
    );
  }

  return (
    <div className="page-header">
      <div className="page-header__container container">
        {breadcrumb}
        {header}
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  /** page header */
  header: PropTypes.node,
  /** array of breadcrumb links */
  breadcrumb: PropTypes.array,
};

PageHeader.defaultProps = {
  breadcrumb: [],
};

export default PageHeader;
