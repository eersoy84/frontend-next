// react
import React, { Fragment, useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userAccount';
import AccountPageTabs from './AccountPageTabs';
export default function AccountPageLogout(props) {
    let tab = props.match.params.tab;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout())
    }, [])
    return (
        <>
            <AccountPageTabs defaultTab={tab} />
        </>
    )
}
