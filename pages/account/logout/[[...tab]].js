// react
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/userAccount';
import AccountPageTabs from '../../../components/account/AccountPageTabs';
import { useRouter } from 'next/router'
import { wrapper } from '../../../store/configureStore'
import {
    login
} from '../../../store/userAccount/userAccountActions';

export default function AccountPageLogout() {
    const { query } = useRouter()
    const { tab } = query
    const dispatch = useDispatch();
    useEffect(async () => {
        dispatch(logout())
    }, [])
    return (
        <>
            <AccountPageTabs defaultTab={tab && tab[0]} />
        </>
    )
}
