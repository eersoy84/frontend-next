import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";

// application
import Collapse from "../shared/Collapse";
import useHasMounted from "../../hooks/useHasMounted";

function FilterCategoriesDeneme(props) {
  const { items, location, onItemClick } = props;
  let brandList;
  let arrow;

  const hasMounted = useHasMounted();

  const handleItemClick = (id, brands) => {
    if (onItemClick) onItemClick(id, brands);
  };

  const itemList = items.map((item) => {
    const searchPath = `/kategori?categoryId=${item.id}&`;
    const renderCategory = ({ toggle, setItemRef, setContentRef }) => {
      let expander;
      let children;
      if (item?.subCategories && item?.subCategories?.length > 0) {
        expander = (
          <button
            className="widget-categories__expander"
            type="button"
            aria-label="Expand"
            onClick={toggle}
          />
        );

        children = (
          <div className="widget-categories__subs" ref={setContentRef}>
            <ul>
              {hasMounted &&
                item.subCategories?.map((subcategory) => (
                  <li key={subcategory.id}>
                    <Link href={`/kategori?categoryId=${item.id}`}>
                      <a
                        onClick={() =>
                          handleItemClick(subcategory.id, subcategory.brands)
                        }
                      >
                        {subcategory.name}
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        );
      }

      return (
        <li className="widget-categories__item" ref={setItemRef}>
          <div className="widget-categories__row">
            <Link href={`/kategori?parentId=${item.id}`}>
              <a onClick={() => handleItemClick(item.id, item.brands)}>
                <Image
                  src={item.imgUrl}
                  className="category_list_icon"
                  height={15}
                  width={15}
                />
                {item.name}
              </a>
            </Link>
            {expander}
          </div>
          {children}
        </li>
      );
    };
    return (
      hasMounted && (
        <Collapse
          key={item.id}
          toggleClass="widget-categories__item--open"
          render={renderCategory}
        />
      )
    );
  });

  return (
    <div>
      <div
        className={`widget-categories widget-categories--location--${location} widget`}
        style={{ borderRadius: "10px" }}
      >
        <h4 className="widget__title">Kategoriler</h4>
        <ul className="widget-categories__list">{itemList}</ul>
      </div>
    </div>
  );
}

FilterCategoriesDeneme.propTypes = {
  items: PropTypes.array,
};

export default FilterCategoriesDeneme;
