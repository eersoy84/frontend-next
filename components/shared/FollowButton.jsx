// react
import React, { Fragment, useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import AsyncAction from './AsyncAction';
import { follow, unfollow } from '../../store/userAccount';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function FollowButton(props) {
  const {
    adId, isFollowing, onFollow, numOfParticipants,
  } = props;
  const { data: session } = useSession()
  const user = session?.user
  const router = useRouter()

  const dispatch = useDispatch();

  const increment = (participants) => {
    if (onFollow) {
      onFollow(++participants);
    }
  };
  const decrement = (participants) => {
    if (onFollow) {
      onFollow(--participants);
    }
  };

  const checkDefaultValue = () => {
    if (user) {
      if (isFollowing === true) {
        return true;
      }
      return false;
    }
    return false;
  };
  const [isClick, setIsClick] = useState(() => checkDefaultValue());

  const participants = numOfParticipants;

  const checkCondition = () => {
    if (user) {
      if (isFollowing === true) {
        setIsClick(true);
        decrement(participants);
        setIsClick(false);
        return dispatch(unfollow(adId));
      }
      setIsClick(true);
      increment(participants);
      return dispatch(follow(adId));
    }
    toast.info('İlanı Takip Etmek İçin Giriş Yapınız!');
    router.push('/hesap/cikis');
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
          className={classNames('btn-like', {
            'btn-loading': loading,
          })}
        >
          {isFollowing
            ?
            <Image src="/icons/red-heart-20.svg" height={22} width={22} />
            :
            <Image src="/icons/heart-20.svg" height={20} width={20} />}
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
