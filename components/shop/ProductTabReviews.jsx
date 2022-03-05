// react
import { useState, useEffect, useRef, } from 'react';

// application
import Pagination from '../shared/Pagination';
import Rating from '../shared/Rating';
import Image from 'next/image'
// data stubs
// import reviews from '../../data/shopProductReviews';
import classNames from 'classnames';

function ProductTabReviews(props) {
  const { reviews } = props;
  const [orderList, setOrderList] = useState([]);

  const handlePageChange = (items) => {
    setOrderList(items)
  };


  const reviewsList = orderList && orderList.map((review, index) => {
    return (<li key={index} className="reviews-list__item">
      <div className="review">
        {/* <div className="review__avatar"><img src={review.avatar} alt="" /></div> */}
        <div className=" review__content">
          <div className=" review__author">{review.userName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: 'green' }}>Ürünü satın aldı&nbsp;&nbsp;
              <span style={{ textAlign: 'center' }}>
                <Image src={'/icons/check-12x9.svg'} height={12} width={9} />
              </span>
            </span>
            <div className=" review__rating">
              <Rating value={review.star} />
            </div>
          </div>
          <div className="review__text">{review.content}
            <div className="review__date">{review.date}</div>
          </div>
        </div>
      </div>
    </li>)
  });

  return (
    <div className="reviews-view">
      <div className="reviews-view__list">
        <div className="d-flex justify-content-between align-items-baseline">

          <h4 className="d-none d-sm-block reviews-view__header">Müşteri Yorumları</h4>
          <h6 className="d-block d-sm-none reviews-view__header">Müşteri Yorumları</h6>
        </div>

        <div className="reviews-list">
          <ol className="reviews-list__content">
            {reviews?.length > 0 ? reviewsList :
              (<div className="block block-empty">
                <div className="container">
                  <div className="block-empty__body">
                    <div className="block-empty__message">Bu ilan hakkında herhangi bir yorum yapılmamıştır</div>
                  </div>
                </div>
              </div>)
            }
          </ol>
          {reviews?.length > 0 &&
            < div className="reviews-list__pagination">
              <Pagination items={reviews} onPageChange={handlePageChange} limit={5} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default ProductTabReviews;
