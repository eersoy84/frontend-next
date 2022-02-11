// react
import React, { Fragment, useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userAccount';
import AccountPageTabs from './AccountPageTabs';
import { useSession } from 'next-auth/react';
export default function AccountPageLogout(props) {
    const { signOut } = useSession
    let tab = props.match.params.tab;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout())
        signOut()
    }, [])
    return (
        <>
            <AccountPageTabs defaultTab={tab} />
        </>
    )
}
