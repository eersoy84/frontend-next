import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import AsyncAction from './AsyncAction';
import { follow, unfollow } from '../../store/userAccount';
import Image from 'next/image'
import { useRouter } from 'next/router';

function CheckButtonCondition(props) {
  const {
    user, follow, unfollow, product } = props;
  const router = useRouter()
  const checkCondition = () => {
    if (user) {
      console.log('product=>', product);
      if (product && product.isFollowing) {
        return unfollow(product.adId);
      }
      return follow(product.adId);
    }
    toast.info('İlanı Takip Etmek İçin Giriş Yapınız!');
    router.push('hesap/cikis')

    return new Promise((resolve) => {
      resolve();
    });
  };
  const buttonCondition = (
    <AsyncAction
      action={() => checkCondition()}
      render={({ run, loading }) => (
        <button
          type="button"
          onClick={run}
          className={classNames('btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist', {
            'btn-loading': loading,
          })}
        >
          {product.isFollowing
            ?
            <Image src="/icons/red-blinking-heart.svg" className="heart_blink" height={100} width={100} />
            :
            <Image src="/icons/heart-20.svg" height={20} width={20} />
          }
        </button>
      )}
    />

  );
  return (
    <div>
      {buttonCondition}
    </div>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  follow,
  unfollow,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckButtonCondition);
