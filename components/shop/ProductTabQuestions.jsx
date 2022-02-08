// react
import { useState, useEffect, useRef, } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
// application
import Pagination from '../shared/Pagination';
import Rating from '../shared/Rating';
import Image from 'next/image'

// data stubs
import classNames from 'classnames';
import AskQuestionModal from './AskQuestionModal';


function ProductTabQuestions(props) {
  const { questions } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const { user } = useSelector(state => ({
    user: state.userAccount.user,
  }), shallowEqual);
  const askQuestionsToSeller = () => {
    setIsModalOpen(true);
  }

  const handlePageChange = (items) => {
    setOrderList(items)
  };
  const questionList = orderList && orderList.map((review, index) => (
    <li key={index} className="reviews-list__item">
      <div className="review">
        {/* <div className="review__avatar"><img src={review.avatar} alt="" /></div> */}
        <div className=" review__content">
          <div className=" review__author">{review.userName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            {review.isBought ?
              (<span style={{ color: 'green' }}>
                Ürünü satın aldı&nbsp;&nbsp;
                <Image src='/icons/check-12x9.svg'
                  style={{ textAlign: center }}
                  height={12}
                  width={9} />
              </span>)
              : null
            }
          </div>
          <div className="review__text"><span style={{ fontWeight: 'bolder' }}>SORU:</span>&nbsp;{review.question}
            <div className="review__date">{review.questionDate}</div>
          </div>
          {review.answer ?
            <div className="ml-5 mt-3">
              <span style={{ fontWeight: 'bolder', color: 'green' }}>CEVAP:</span>&nbsp;{review.answer}
            </div> :
            <div className="ml-5 mt-3">
              <span style={{ fontWeight: 'bold', color: 'red' }}>Cevap Bekleniyor...</span>
            </div>}
          <div className="ml-5 review__date">{review.answerDate}</div>
        </div>
      </div>
    </li>

  ));

  return (
    <div className="reviews-view">

      {
        isModalOpen ? (<AskQuestionModal show={true} onHide={() => setIsModalOpen(false)} {...props}>
        </AskQuestionModal >) : null
      }
      <div className="reviews-view__list">
        <div className="d-flex justify-content-between align-items-baseline">
          <h4 className="d-none d-sm-block reviews-view__header">Satıcı Soruları</h4>
          <h6 className="d-block d-sm-none reviews-view__header">Satıcı Soruları</h6>
          {user &&
            <div>
              <span
                className="add_new_address"
                onClick={askQuestionsToSeller}
                style={{ fontWeight: 500 }}
              >
                <span className='text-success'>Satıcıya soru sor</span>
                <i className="fas fa-question ml-2" style={{ color: '#f1861d' }} />
              </span>
            </div>}
        </div>

        <div className="reviews-list">
          <ol className="reviews-list__content">
            {questions && questions.length > 0
              ? questionList
              : (<div className="block block-empty">
                <div className="container">
                  <div className="block-empty__body">
                    <div className="block-empty__message">Bu ilan hakkında herhangi bir soru sorulmamıştır</div>
                  </div>
                </div>
              </div>)
            }
          </ol>
          {questions && questions.length > 0 &&
            < div className="reviews-list__pagination">
              <Pagination items={questions} onPageChange={handlePageChange} limit={5} />
            </div>
          }
        </div>
      </div>
    </div >
  );
}

export default ProductTabQuestions;
